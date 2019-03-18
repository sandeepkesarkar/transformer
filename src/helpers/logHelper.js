const { createLogger, format, transports } = require("winston");
const fs = require("fs");
require("winston-daily-rotate-file");

const config = require("config");

switch (process.env.NODE_ENV) {
case "test":
  //
  // Remove the file, ignoring any errors
  //
  try {
    fs.unlinkSync(config.logging.infoFile);
  } catch (ex) {
    console.log("Error while deleting the info log file"); // eslint-disable-line no-console
  }
  try {
    fs.unlinkSync(config.logging.errorFile);
  } catch (ex) {
    console.log("Error while deleting the error log file"); // eslint-disable-line no-console
  }
  try {
    fs.unlinkSync(config.logging.debugFile);
  } catch (ex) {
    console.log("Error while deleting the debug log file"); // eslint-disable-line no-console
  }
  break;
default:
  console.log(`Application running in ${process.env.NODE_ENV} env`); // eslint-disable-line no-console
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.label({ appName: config.appName }),
    format.json()
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: config.logging.errorFile,
      datePattern: "YYYY-MM-DD",
      maxFiles: 10,
      level: "error"
    }),
    new transports.DailyRotateFile({
      filename: config.logging.infoFile,
      datePattern: "YYYY-MM-DD",
      maxFiles: 10,
      level: "info"
    }),
    new transports.DailyRotateFile({
      filename: config.logging.debugFile,
      datePattern: "YYYY-MM-DD",
      maxFiles: 10,
      level: "debug"
    })
  ]
});

switch (process.env.NODE_ENV) {
case "test":
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple())
    })
  );
}

module.exports = {
  logger: logger
};
