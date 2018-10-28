import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

const authenticate = (req, res, next) => {
  const { token } = (req.headers.authorization).split(" ")[1];
  console.log('token', token);
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('decoded', decoded);
    req.userData = decoded;
    next();
  }
  catch (error) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({
        'data': {
          'message': 'Authentication failed!',
          'info': 'Unauthorized user'
        }
      })
  }
}

module.exports = authenticate;