import jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';

const authenticate = async (req, res, next) => {
  try {
    const token = (req.headers["authorization"]).split(" ")[1];
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
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