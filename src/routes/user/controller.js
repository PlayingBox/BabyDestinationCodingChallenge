require("babel-polyfill");

import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import bcryptjs from 'bcryptjs';
import { userValidationSchema } from '../../schema_validations';
import { userDbm } from '../../db/dbManipulationLayer';

const controller = {};

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
}

controller.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const inputData = { fullname, email, password };
  console.log('inputData', inputData);
  const { error, value } = Joi.validate(
    inputData,
    userValidationSchema.registerSchema
  );

  console.log('validation error', error);

  if(error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ 'Error': error.details[0].message });
  }

  try {
    let result = '';

    console.log('email before db call', email);

    result = await userDbm.getUserByEmail(email);
    console.log('result of user email fetch', result);

    if(result == email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ 'Error': 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);
    console.log('hashed password', hashedPassword);

    result = await userDbm.createUser(fullname, email, hashedPassword);
    console.log('user created id', result);

    return res
      .status(HttpStatus.CREATED)
      .json({ 'data': { 'userId': result } });
  }

  catch (error) {
    console.log('catch', error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ 'Error': error });
  }
}

controller.loginUser = (req, res) => {

}

module.exports = controller;