const Users = require("../models/hrModel");
const createError = require("http-errors");
const { userValidateLogin } = require("../helpers/validation");
const { signAccessToken, signRefreshToken } = require("../helpers/jwtService");
const auth = require("../middlewares/authMiddleware");
const client = require("../helpers/connectRedis");

const authServices = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidateLogin(req.body);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const user = await Users.findOne({ email });
      if (!user) {
        throw createError.NotFound("User not User does not exist!");
      }

      const isValid = await user.isCheckPassword(password);
      if (!isValid) {
        throw createError.Unauthorized("Invalid password");
      }

      const { _id } = user;

      const accessToken = await signAccessToken({ _id });
      const refreshToken = await signRefreshToken({ _id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/api/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 30, //30days
        sameSite: "strict",
      });

      return {
        accessToken,
        user: { ...user._doc, password: null },
      };
    } catch (error) {
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const rf_token = req.cookies.refreshToken;

      if (!rf_token || rf_token === null) {
        throw createError.BadRequest("Please Login");
      }
      const { _id } = await auth.verifyRefreshToken(rf_token);

      const accessToken = await signAccessToken({ _id });
      const refreshToken = await signRefreshToken({ _id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/api/refresh-token",
        maxAge: 1000 * 60 * 60 * 24 * 30, //30days
      });
      console.log(_id);
      const user = await Users.findById(_id).select("-password");

      return {
        accessToken,
        user,
      };
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("refreshToken", { path: "/api/refresh-token" });
      return { msg: "Logout success" };
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authServices;
