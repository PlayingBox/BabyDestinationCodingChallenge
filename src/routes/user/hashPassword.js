require("babel-polyfill");

import bcryptjs from 'bcryptjs';

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcryptjs.hash(password, saltRounds);
}

module.exports = hashPassword;