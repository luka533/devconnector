const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// all we need is signin, login, getuser routes (not really following the rest architecture)

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.use(authController.protect);

router.route("/").get(userController.getUser);

router.get("/logout", authController.logout);
// .post(userController.createUser);

// router
//   .route("/:id")
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
