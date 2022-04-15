const Joi = require("joi");

const userValidate = (data) => {
  const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string()
      .pattern(new RegExp("gmail.com"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().min(6).max(32).required(),
  });

  return userSchema.validate(data);
};

const userValidateLogin = (data) => {
  const userSchema = Joi.object({
    email: Joi.string()
      .pattern(new RegExp("gmail.com"))
      .email()
      .lowercase()
      .required(),
    password: Joi.string().required(),
  });

  return userSchema.validate(data);
};

module.exports = { userValidate, userValidateLogin };
