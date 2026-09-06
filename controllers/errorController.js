// from Jonas Schemdtmann NODEJS course

const AppError = require("../util/AppError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${Object.keys(err.keyValue)[0]}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err);

  // in development we need to see the full error
  if (process.env.NODE_ENV === "development") {
    return res
      .status(err.statusCode)
      .json({ status: err.status, message: err.message });

    // in prodcution if:
    // if oporational => send according guiding message
    // if programmatic => send generic error so that we do not leak it to the client and expose internal details
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    console.log(error);

    // make the error readable
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    // if the error is operational e.g. user does not input his email when required
    if (error.isOperational)
      return res
        .status(error.statusCode)
        .json({ status: error.status, message: error.message });
  }

  // if the error is programmatic e.g. we have a syntax error in our code
  return res.status(500).json({
    status: "error",
    message: "Something went wrong! Please try again!",
  });
};
