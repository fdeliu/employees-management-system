require("express-async-errors");
module.exports = function() {
  process.on("uncaughtException", err => {
    console.log("Uncaught Exception: ", err);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    console.log("Uhandled Rejection: ", err);
    process.exit(1);
  });
};
