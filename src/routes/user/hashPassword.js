require("babel-polyfill");

import bcrypt from 'bcryptjs';

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

module.exports = hashPassword;