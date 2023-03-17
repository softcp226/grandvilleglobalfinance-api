const Joi = require("joi");
const validate_loan_request = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    loan_amount: Joi.string().required(),
    loan_type: Joi.string().required(),
    duration: Joi.string().required(),
    loan_details: Joi.string().required(),
  });
  const result = schema.validate({
    user: req.user,
    loan_amount: req.loan_amount,
    loan_type: req.loan_type,
    duration: req.loan_duration,
    loan_details: req.loan_details,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_loan_request;
