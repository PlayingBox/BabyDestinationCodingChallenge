require("babel-polyfill");

import pool from '../../db';

const dmlFunctions = {};

dmlFunctions.getUserByEmail = async (email) => {
  if(!email) {
    throw {
      'Error': 'email not found'
    };
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT id, email, password FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0];
  }
  catch (error) {
    throw {
      'Error': error
    };
  }
}

dmlFunctions.createUser = async (fullname, email, password) => {
  if(!fullname) {
    throw {
      'Error': 'fullname not found'
    };
  } else if(!email) {
    throw {
      'Error': 'email not found'
    };
  } else if(!password) {
    throw {
      'Error': 'password not found'
    };
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      ('INSERT INTO users(fullname, email, password)' +
        'VALUES($1, $2, $3) RETURNING id'),
      [fullname, email, password]
    );

    return result.rows[0];
  }
  catch (error) {
    throw {
      'Error': error
    };
  }
}

dmlFunctions.editUserProfile = async (fullname, userId) => {
  if(!fullname) {
    throw {
      'Error': 'fullname not found'
    };
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'UPDATE users SET fullname=($1) where id=($2)',
      [fullname, userId]
    );

    return result.rows[0];
  }
  catch (error) {
    throw {
      'Error': error
    };
  }
}

module.exports = dmlFunctions;