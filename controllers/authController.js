const authServices = require("../services/authService");

const authCtrl = {
  register: async (req, res, next) => {
    const result = await authServices.register(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Register Success", user: result });
  },
  login: async (req, res, next) => {
    const result = await authServices.login(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Login Success", data: result });
  },
};

module.exports = authCtrl;
