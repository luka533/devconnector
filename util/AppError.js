module.exports = class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith("4") ? "fail" : "error";

    this.isOperational = true;

    // we omit new AppError() from error stack trace
    Error.captureStackTrace(this, this.constructor);
  }
};
