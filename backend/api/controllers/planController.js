const prisma = require("../utils/prismaClient");
const factory = require("./handlerFactoryPg");

exports.setProviderId = (req, res, next) => {
  if (req.user.role == "insurer") {
    req.params.providerId = req.user._id;
    req.body.providerId = req.user._id;
  }
  next();
};

const table = prisma.insurancePlans;

exports.getAllPlans = factory.getAll(table);
exports.createPlan = factory.createOne(table);
exports.getPlanById = factory.getOne(table);
exports.updatePlan = factory.updateOne(table);
exports.deletePlan = factory.deleteOne(table);
