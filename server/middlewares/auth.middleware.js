const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log('auth middleware', req.headers['x-access-token']);
  let token = req.headers['x-access-token'];
  // console.log(token);
  if (token) {
    token = token.split(' ')[1];
    try {
      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decodedToken._doc;
      return next();
    }
    catch (error) {
      return res.status(400).send({
        isTokenRevoked: true,
        errorMessage: 'Authentication Failed.',
      });
    }
    // jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
    //   if (error) {
    //     return res.status(400).send({
    //       isTokenRevoked: true,
    //       errorMessage: 'Authentication Failed.',
    //     });
    //   }
    //   else {
    //     console.log(decoded._doc);
    //     req.user = decoded._doc;
    //     return next();
    //   }
    // });
  }
  // else {
  return res.status(403).send({
    errorMessage: 'No token provided.',
  });
  // }
};
