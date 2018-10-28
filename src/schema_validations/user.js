import Joi from 'joi';

const userValidationSchemas = {};

userValidationSchemas.registerSchema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required()
});

userValidationSchemas.loginSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required()
});


module.exports = userValidationSchemas;