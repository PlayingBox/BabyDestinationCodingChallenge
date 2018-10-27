import pool from '../../db';
import Joi from 'joi';
import HttpStatus from 'http-status-codes';

const schema = Joi.object().keys({
  fullname: Joi.string().required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  password: Joi.string().required()
});

const controller = {};

controller.registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;
  const inputData = { fullname, email, password };
  const { error, value } = Joi.validate(inputData, schema);

  if(error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ 'Error': error.details[0].message });
  }

  try {
    let result = '';
    const client = await pool.connect();
    result = await client.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );

    if(result.rows[0] == email) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ 'Error': 'Email already registered' });
    }

    result = await client.query(
      ('INSERT INTO users(fullname, email, password)' +
      'VALUES($1, $2, $3) RETURNING id'),
      [fullname, email, password]
    );

    return res
      .status(HttpStatus.CREATED)
      .json({ 'data': { 'userId': result.rows[0].id } });
  }

  catch (error) {
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ 'Error': error });
  }
}

module.exports = controller;