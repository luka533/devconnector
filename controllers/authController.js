const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const gravatar = require("gravatar");

const catchAsync = require("../util/catchAsync");
const AppError = require("../util/AppError");
const User = require("../models/userModel");

const sendJwtCookie = (res, user, statusCode, message) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expiresIn: process.env.COOKIE_MAX_AGE,
  });

  res.status(statusCode).json({
    status: "success",
    message,
    token,
    data: {
      user,
    },
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next(new AppError("You are not logged in!", 401));

  // verify token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError("User belonging to this token does not longer exist"),
    );
  // console.log(user.id);

  req.user = decoded.id;

  next();
});

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body || {};
  if (!name || !email || !password || !passwordConfirm)
    return next(
      new AppError(
        "You need to fill name, email, password and password confirm fields",
        500,
      ),
    );
  const avatar = gravatar.url(email, {
    size: "200",
    r: "pg",
    d: "mm",
  });

  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    avatar,
  });

  sendJwtCookie(res, newUser, 201, "Successfully signed up!");
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return next(
      new AppError("You need to fill email and password fields!", 401),
    );

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError("Email or password are not correct!", 401));

  sendJwtCookie(res, user, 200, "Successfully logged in!");
});

exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully!",
  });
};
