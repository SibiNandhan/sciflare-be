const jwt = require("jsonwebtoken");

exports.createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};
