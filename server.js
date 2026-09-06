const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

const DB = process.env.db_connection_string.replace(
  "<db_password>",
  process.env.db_password,
);

mongoose.connect(DB);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});

//global error handlers (application might be in a corrupted state)

// https://dev.to/silentwatcher_95/the-silent-killers-in-nodejs-uncaughtexception-and-unhandledrejection-1p9b
// https://medium.com/@rahulrathore.1986/node-js-how-node-js-handle-uncaught-exceptions-7d47a85cadfb

// global error handler for synchronous erros
// process.on("uncaughtException", (err) => {
//   console.log(err);
//   process.exit(1);
// });

// // global error handler for async errors and shutting down gracefully
// process.on("unhandledRejection", (err) => {
//   console.log(err);
//   server.close(() => {
//     console.log("Shutting down");
//     process.exit(1);
//   });
// });
