const jwt = require('jsonwebtoken');

exports.generateAccessToken = (user) => {
  const token = jwt.sign(
    user,
    process.env.TOKEN_SECRET,
    process.env.EXPIRE_TIME
  );
  return token;
};

const getToken = (req) => {
  try {
    const token = (
      req.headers['Authorization'] ||
      req.headers['authorization'] ||
      req.cookies.token
    ).split(' ');
    return token[token.length - 1] || null;
  } catch (err) {
    return null;
  }
};

const auth = (req) => {
  return jwt.verify(getToken(req), process.env.TOKEN_SECRET, (err, decoded) => {
    if (err || !decoded) {
      return {
        success: false,
        err: err || 'Unexpected Error Occured'
      };
    } else {
      return {
        success: true,
        user: decoded
      };
    }
  });
};

exports.isLoggedIn = (req, res, next) => {
  const authResponse = auth(req);
  if (!authResponse.success) {
    res.status(401).json({
      success: false,
      err: 'Authentication Failed!'
    });
  } else {
    req.user = authResponse.user;
    next();
  }
};

exports.isTeacher = (req, res, next) => {
  if (req.user && req.user.type != 'student') {
    next();
  } else {
    res.status(403).json({
      success: false,
      err: 'Teacher Authorization Needed!'
    });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.type == 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      err: 'Admin Authorization Needed!'
    });
  }
};
