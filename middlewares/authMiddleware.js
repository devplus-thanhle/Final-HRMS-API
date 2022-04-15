const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const auth = {
  verifyToken: async (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return next(createError.Unauthorized("Invalid Token"));
      }
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return next(err);
        req.payload = decoded;
        next();
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = auth;
