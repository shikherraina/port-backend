const morgan = require("morgan");
const logger = require("../utils/logger");

morgan.token("message", (req, res) => res.locals.errorMessage || "");

const httpLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :message",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);
module.exports = httpLogger;
