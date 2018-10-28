import pool from '../../db';

const dmlFunctions = {};

dmlFunctions.getUserByEmail = async (email) => {
  if(!email) {
    throw { 'Error': 'email not found'};
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0].email;
  }
  catch (error) {
    throw { 'Error': error };
  }
}

dmlFunctions.createUser = async (fullname, email, password) => {
  if(!fullname) {
    throw { 'Error': 'fullname not found'};
  } else if(!email) {
    throw { 'Error': 'email not found'};
  } else if(!password) {
    throw { 'Error': 'email not found'};
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      ('INSERT INTO users(fullname, email, password)' +
        'VALUES($1, $2, $3) RETURNING id'),
      [fullname, email, password]
    );

    return result.rows[0].id;
  }
  catch (error) {
    throw { 'Error': error };
  }
}

module.exports = dmlFunctions;