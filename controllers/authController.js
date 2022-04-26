const authServices = require("../services/authService");
const authCtrl = {
  login: async (req, res, next) => {
    const result = await authServices.login(req, res, next);
    if (!result) return;
    res.status(200).json({ msg: "Login Success", data: result });
  },

  refreshToken: async (req, res, next) => {
    const result = await authServices.refreshToken(req, res, next);
    if (!result) return;
    res.status(200).json({ msg: "Refresh Token Success", result });
  },
  logout: async (req, res, next) => {
    const result = await authServices.logout(req, res, next);

    if (!result) return;

    res.status(200).json(result);
  },
};

module.exports = authCtrl;
