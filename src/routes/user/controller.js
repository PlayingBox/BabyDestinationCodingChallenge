require("babel-polyfill");

import Joi from 'joi';
import bcrypt from 'bcryptjs';
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
      .json({
        'Error': error.details[0].message
      });
  }

  try {
    let result;

    result = await userDbm.getUserByEmail(email);

    if(result && result.email == email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          'Error': 'Email already registered'
        });
    }

    const hashedPassword = await hashPassword(password);

    result = await userDbm.createUser(fullname, email, hashedPassword);

    return res
      .status(HttpStatus.CREATED)
      .json({
        'data':
          { 'message': 'User created Successfully',
            'userId': result.id,
            'info': 'You can login now'
          }
      });
  }

  catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
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
      .json({
        'Error': error.details[0].message
      });
  }

  try {
    let result, validEmail = false, validPassword = false;

    result = await userDbm.getUserByEmail(email);

    if(result && result.email == email) {
      validEmail = true;
      if(await bcrypt.compare(password, result.password)) {
        validPassword = true;
        const token = jwt.sign(
          { userId: result.id },
          process.env.SECRET_KEY,
          {
            expiresIn: '1h'
          });

        return res
          .status(HttpStatus.OK)
          .json({
            'data': {
              'message': 'User logged in Successfully',
              'token': token,
              'info': 'Use this token for Authentication'
            }
          });
      }
    }

    if(!validEmail) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          'data': {
            'message': 'Invalid email',
            'info': 'Wrong email try again!'
          }
        });
    }

    if(!validPassword) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({
          'data': {
            'message': 'Invalid password',
            'info': 'Wrong password try again!'
          }
        });
    }
  }
  catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(error);
  }
}

controller.editUserProfile = async (req, res) => {
  const { fullname } = req.body;
  const inputData = { fullname };
  const { error, value } = Joi.validate(
    inputData,
    userValidationSchema.editSchema
  );

  if(error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ 'Error': error.details[0].message });
  }

  const { userId } = req.userData;

  try {
    const result = await userDbm.editUserProfile(fullname, userId);
    return res
      .status(HttpStatus.ACCEPTED)
      .json({
        'data': {
          'message': 'Fullname changed',
          'info': 'Profile modified'
        }
      })
  }
  catch (error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(error);
  }
}

module.exports = controller;