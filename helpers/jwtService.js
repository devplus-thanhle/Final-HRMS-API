const JWT = require("jsonwebtoken");
const client = require("../helpers/connectRedis");
const createError = require("http-errors");

const signAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};
const signRefreshToken = (payload) => {
  return new Promise((resolve, reject) => {
    JWT.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1y" },
      (err, token) => {
        if (err) reject(err);
        client.set(
          payload._id.toString(),
          token,
          "EX",
          365 * 24 * 60 * 60,
          (err, reply) => {
            if (err) {
              return reject(createError.InternalServerError());
            }
            resolve(token);
          }
        );
      }
    );
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};
