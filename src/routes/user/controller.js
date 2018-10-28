require("babel-polyfill");

import Joi from 'joi';
import HttpStatus from 'http-status-codes';
import { userValidationSchema } from '../../schema_validations';
import { userDbm } from '../../db/dbManipulationLayer';
import hashPassword from './hashPassword';
import jwt from 'jsonwebtoken';

const controller = {};

controller.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const inputData = { fullname, email, password };
  const { error, value } = Joi.validate(
    inputData,
    userValidationSchema.registerSchema
  );

  if(error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ 'Error': error.details[0].message });
  }

  try {
    let result;

    result = await userDbm.getUserByEmail(email);

    if(result && result.email == email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ 'Error': 'Email already registered' });
    }

    const hashedPassword = await hashPassword(password);

    result = await userDbm.createUser(fullname, email, hashedPassword);

    return res
      .status(HttpStatus.CREATED)
      .json({
        'data':
          { 'message': 'User created Successfully',
            'userId': result
          }
      });
  }

  catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(error);
  }
}

controller.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const inputData = { email, password };
  const { error, value } = Joi.validate(
    inputData,
    userValidationSchema.loginSchema
  );

  if(error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ 'Error': error.details[0].message });
  }

  try {
    let result;

    result = await userDbm.getUserByEmail(email);

    if(result && result.email == email) {
      const token = jwt.sign({ email }, process.env.SECRET_KEY);

      return res
        .status(HttpStatus.OK)
        .json({
          'data': {
            'message': 'User logged in Successfully',
            'token': token,
            'advice': 'Use this token for Authentication'
          }
        });
    }

    return res
      .status(HttpStatus.NOT_FOUND)
      .json({
        'data': {
          'message': 'User not registered',
          'advice': 'Please register before logging in'
        }
      });
  }
  catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(error);
  }
}

module.exports = controller;