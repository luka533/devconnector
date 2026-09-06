const AppError = require("./AppError");

/**
 * A small wrapper for async route handlers.
 *
 * This helper is used to avoid repeating try/catch blocks in async
 * Express route functions. Instead of manually handling errors inside
 * every async controller, we pass the function to catchAsync and let it
 * forward any errors to Express error middleware.
 *
 * @param {Function} fn - An async route handler function
 * @returns {Function} - A wrapped function that handles errors automatically
 *
 * Example:
 * app.get('/users', catchAsync(async (req, res, next) => {
 *   const users = await User.find();
 *   res.json(users);
 * }));
 *
 * How it works:
 * - It receives an async function.
 * - It returns a new function that accepts req, res, and next.
 * - When the async function runs, any rejected promise is caught.
 * - The error is passed to next(err), which is handled by Express error middleware.
 */
module.exports = function (fn) {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
