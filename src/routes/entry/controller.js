require("babel-polyfill");

import HttpStatus from 'http-status-codes';

const controller = {};

controller.welcomeUser = async (req, res)  => {
  return res.status(HttpStatus.OK)
    .json({
    'data': {
      'message': 'Welcome to Baby Destination',
      'info': 'App started!'
    }
  });
}


module.exports = controller;