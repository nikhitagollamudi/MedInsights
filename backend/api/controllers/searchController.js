const prisma = require("../utils/prismaClient");
const Fuse = require("fuse.js");
const catchAsync = require("../utils/catchAsync");

const options = {
  includeScore: true,
  findAllMatches: true,
  threshold: 0.1,
  keys: ["name", "specialization"],
};

module.exports = catchAsync(async (req, res) => {
  const { specialization, treatsCovid, name } = req.query;

  let whereClause = {};

  if (treatsCovid) {
    whereClause.treatsCovid = treatsCovid.toLowerCase() === "true";
  }

  const data = await prisma.doctors.findMany({
    where: whereClause,
  });

  const fuse = new Fuse(data, options);

  let searchParams = [];

  if (name) {
    searchParams.push({
      name: name,
    });
  }

  if (specialization) {
    searchParams.push({
      specialization: specialization,
    });
  }

  if (searchParams.length === 0) {
    res.status(200).json({
      status: "success",
      data: data,
    });
  } else {
    const searchResult = fuse.search({
      $and: searchParams,
    });

    const filteredResult = searchResult.map((item) => {
      return item.item;
    });

    res.status(200).json({
      status: "success",
      data: filteredResult,
    });
  }
});
