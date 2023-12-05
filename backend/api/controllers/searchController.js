const prisma = require("../utils/prismaClient");
const Fuse = require("fuse.js");
const catchAsync = require("../utils/catchAsync");

const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ["name"],
};

module.exports = catchAsync(async (req, res) => {
  const { specialization, treatsCovid, name } = req.query;

  let whereClause = {};

  if (treatsCovid != "null") {
    whereClause.treatsCovid = treatsCovid.toLowerCase() === "true";
  }

  const data = await prisma.doctors.findMany({
    where: whereClause,
    include: { feedbacksRecieved: true, hospitals: true },
  });

  const fuse = new Fuse(data, options);

  const specializationList = JSON.parse(specialization);

  if (name == "null") {
    res.status(200).json({
      status: "success",
      data: data,
    });
  } else {
    const searchResult = fuse.search(name);

    const filteredResult = searchResult.map((item) => {
      return item.item;
    });

    if (specializationList.length > 0) {
      const filteredSpecialization = filteredResult.filter((item) => {
        return specializationList.includes(item.specialization);
      });

      res.status(200).json({
        status: "success",
        data: filteredSpecialization,
      });
    }else{
      res.status(200).json({
        status: "success",
        data: filteredResult,
      });
    }
  }
});
