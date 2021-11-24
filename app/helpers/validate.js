const Joi = require("joi");
const httpStatus = require('http-status');
const {ErrorHandler} = require("./error");
const pick = require("./pick");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    var err = new ErrorHandler('200', 'false', errorMessage);
    // return next(new ErrorHandler(httpStatus.BAD_REQUEST, errorMessage));
    return next(err);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
