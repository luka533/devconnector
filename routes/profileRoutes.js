const express = require("express");
const profileController = require("../controllers/profileController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", profileController.getAllProfiles);
router.get("/github/:username", profileController.getGithubProfile);

router.use(authController.protect);

router
  .route("/")
  // can be used to create and update if exists
  .post(profileController.createProfile)
  .delete(profileController.deleteProfile);

router.get("/me", profileController.getUserProfile);

router.get("/user/:userId", profileController.getProfileByUserId);

router.patch("/experience", profileController.addExperience);

router.delete("/experience/:expId", profileController.deleteExperience);

router.patch("/education", profileController.addEducation);
router.delete("/education/:eduId", profileController.deleteEducation);

module.exports = router;
