const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const Email = require("./../utils/emails");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const base32 = require("base32.js");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const createAndSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // cookie cannot be modified by browser
  };

  if (req.secure || req.get("x-forwarded-proto") === "https")
    cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user: {
        MongoId: user._id,
        email: user.email,
      },
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Generate a TOTP secret key for the user
  const secretKey = speakeasy.generateSecret();

  // Store the user's data in the database
  const newUser = await User.create({
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    secretKey: secretKey.base32,
  });

  // Generate a provisioning URL for the user to scan with their authenticator app
  const provisioningUri = speakeasy.otpauthURL({
    secret: secretKey.ascii,
    label: `${process.env.APP_NAME}:${req.body.email}`,
    issuer: `${process.env.APP_NAME}`,
  });

  // Generate a QR code
  qrcode.toDataURL(provisioningUri, async (err, dataUrl) => {
    if (err) {
      return next(new AppError("There was an error generating QR Code", 500));
    }
    // Return the provisioning URI and QR code to the client
    await new Email(newUser, dataUrl).sendWelcome();
    res.status(200).json({
      status: "success",
      qrCode: dataUrl,
      data: {
        user: {
          MongoId: newUser._id,
          email: newUser.email,
          secretKey: secretKey.base32,
        },
      },
    });
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password, token } = req.body;

  if (!email || !password || !token)
    return next(new AppError("Please provide email, password and token", 400));

  const user = await User.findOne({ email: email })
    .select("+password")
    .select("+secretKey");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Incorrect email or password", 401));

  // Verify the TOTP token
  const verified = speakeasy.totp.verify({
    secret: user.secretKey,
    encoding: "base32",
    token: token,
    window: 1,
  });

  if (!verified) {
    return next(new AppError("Incorrect TOTP Token", 401));
  }

  createAndSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedOut", {
    expires: new Date(Date.now() + 2.5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError("Your are not logged in !!", 401));
  }

  // 2) token verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check User exist or not
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("User belonging to this user no longer exist", 401)
    );
  }

  // 4) Check if user changed password after the token issued.
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User Recently changed Password !!! login again", 401)
    );
  }

  req.user = user;
  next();
});

exports.restrictTo = (...accessLevels) => {
  return (req, res, next) => {
    if (!accessLevels.includes(req.user.access)) {
      // due to closure
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get User based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }
  // 2) get reset token and save (encrypted ones are saved)
  const resetToken = await user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3) sending mails
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("There was an Error sending Email", 500));
  }
});

exports.forgotTwoFactor = catchAsync(async (req, res, next) => {
  // 1) Get User based on email
  const user = await User.findOne({ email: req.body.email }).select(
    "+secretKey"
  );
  if (!user) {
    return next(new AppError("There is no user with this email address", 404));
  }

  // otpauthURL expects secret in ascii
  const decoder = new base32.Decoder({ type: "rfc4648" });
  const decodedBuffer = decoder.write(user.secretKey).finalize();
  const asciiString = decodedBuffer.toString("utf8").replace(/\0/g, "");

  // 2) create a provisiongUri from the secretKey
  const provisioningUri = speakeasy.otpauthURL({
    secret: asciiString,
    label: `${process.env.APP_NAME}:${user.email}`,
    issuer: `${process.env.APP_NAME}`,
  });

  // 3) Generate a QR code and send email
  qrcode.toDataURL(provisioningUri, async (err, dataUrl) => {
    if (err) {
      return next(new AppError("There was an error generating QR Code", 500));
    }
    // Send the QR code via email to the user
    await new Email(user, dataUrl).sendWelcome();

    res.status(200).json({
      status: "success",
      message: "QR Code sent to email!",
    });
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) get user based on the Token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //2) If token is not expired, and there is user, set the new password
  if (!user) return next(new AppError("Token is Invalid or Expired", 400));

  //3) Update changePasswordAt
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //4) Log the user in, send JWT
  createAndSendToken(user, 201, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) get user from the collection
  const user = await User.findOne(req.user._id).select("+password");

  // 2) check whether posted password is correctPassword
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("Current Password is incorrect", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // password.changedAt is implemented in middleware

  // 3) log user in, send JWT
  createAndSendToken(user, 201, req, res);
});
