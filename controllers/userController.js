const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const catchAsync = require("../util/catchAsync");

const gravatar = require("gravatar");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // console.log(users);

  console.log(req.headers.authorization);

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   const { name, email, password, passwordConfirm } = req.body;
//   if (!name || !email || !password || !passwordConfirm)
//     return res.status(400).json({
//       status: "error",
//       message: "You need to fill email, password and password confirm fields",
//     });

//   const avatar = gravatar.url(email, {
//     size: "200",
//     r: "pg",
//     d: "mm",
//   });

//   const newUser = await User.create({ name, email, password, passwordConfirm });

//   const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });

//   res.status(200).json({ status: "success", token });
// });

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = (req, res, next) => {
  res.status(200).json({ status: "success" });
};
exports.deleteUser = (req, res, next) => {
  res.status(200).json({ status: "success" });
};
