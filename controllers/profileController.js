const profileServices = require("../services/profileService");

const profileCtrl = {
  createProfile: async (req, res, next) => {
    const result = await profileServices.createProfile(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Create Profile Success", result });
  },
  changeStatusProfile: async (req, res, next) => {
    const result = await profileServices.changeStatusProfile(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Change Status Profile Success", result });
  },
};

module.exports = profileCtrl;
