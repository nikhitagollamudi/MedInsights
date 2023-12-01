const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

// the returned function still has access to model due to closures
exports.createOne = (table) => {
  return catchAsync(async (req, res, next) => {
    const doc = await table.create({
      data: req.body,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

exports.deleteAll = (table) => {
  return catchAsync(async (req, res, next) => {
    await table.deleteMany({
      where: req.params,
    });

    res.status(200).json({
      status: "success",
      data: null,
    });
  });
};

exports.deleteOne = (table) => {
  return catchAsync(async (req, res, next) => {
    table.delete({
      where: req.params,
    }); // await not required

    res.status(200).json({
      status: "success",
      data: null,
    });
  });
};

exports.updateOne = (table, options) => {
  return catchAsync(async (req, res, next) => {
    delete req.body.id;
    const doc = await table.update({
      data: req.body,
      where: req.params,
      ...options,
    });

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });
};

exports.getOne = (table, options) => {
  return catchAsync(async (req, res, next) => {
    const doc = await table.findUnique({
      where: req.params,
      ...options,
    });

    if (!doc) {
      return next(new AppError("No record found with that ID", 404));
    }

    const addRes = res.locals.responseData?._doc;
    res.status(200).json({
      status: "success",
      data: {
        data: {
          ...doc,
          ...addRes,
        },
      },
    });
  });
};

exports.getAll = (table, options) => {
  return catchAsync(async (req, res, next) => {
    const docs = await table.findMany({
      where: req.params,
      ...options,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: docs,
      },
    });
  });
};
