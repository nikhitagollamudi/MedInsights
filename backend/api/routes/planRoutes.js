const express = require("express");
const planController = require("./../controllers/planController");
const authController = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

// feedback routes need authentication
router.use(authController.protect);

router
  .route("/")
  .post(
    authController.restrictTo("insurer", "admin"),
    planController.setProviderId,
    planController.createPlan
  );

router
  .route("/:id")
  .get(planController.getPlanById)
  .patch(
    authController.restrictTo("insurer", "admin"),
    planController.updatePlan
  )
  .delete(
    authController.restrictTo("insurer", "admin"),
    planController.deletePlan
  );

module.exports = router;
