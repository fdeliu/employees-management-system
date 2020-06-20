const Joi = require("joi");

function validateEmployee(employee) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .email()
      .min(5)
      .max(50)
      .required(),
    phone: Joi.string()
      .min(10)
      .max(15)
      .required(),
    profileImage: Joi.string().required(),
    education: Joi.string()
      .min(5)
      .required(),
    position: Joi.string()
      .min(5)
      .max(255)
      .required(),
    started: Joi.string().required()
  };

  return Joi.validate(employee, schema);
}

function validateRegister(user) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    isAdmin: Joi.boolean()
  };

  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required()
  };

  return Joi.validate(user, schema);
}

module.exports = {
  validateEmployee,
  validateRegister,
  validateLogin
};
