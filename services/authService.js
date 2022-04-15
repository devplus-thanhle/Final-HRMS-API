const Users = require("../models/userModel");
const createError = require("http-errors");
const { userValidate, userValidateLogin } = require("../helpers/validation");
const { signAccessToken, signRefreshToken } = require("../helpers/jwtService");

const authServices = {
  register: async (req, next) => {
    try {
      const { fullname, email, password } = req.body;
      const { error } = userValidate(req.body);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }
      const emailExits = await Users.findOne({ email });
      if (emailExits) {
        throw createError.Conflict(`${email} already exists`);
      }

      const newUser = new Users({
        fullname,
        email,
        password,
      });

      const result = await newUser.save();

      return result;
    } catch (error) {
      next(error);
    }
  },
  login: async (req, next) => {
    try {
      const { email, password } = req.body;
      const { error } = userValidateLogin(req.body);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }

      const user = await Users.findOne({ email });
      if (!user) {
        throw createError.NotFound("User not registered");
      }

      const isValid = await user.isCheckPassword(password);
      if (!isValid) {
        throw createError.Unauthorized("Invalid password");
      }

      const { _id, isAdmin } = user;

      const accessToken = await signAccessToken({ _id, isAdmin });
      const refreshToken = await signRefreshToken({ _id, isAdmin });

      return {
        accessToken,
        refreshToken,
        user: { ...user._doc, password: null },
      };
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authServices;
