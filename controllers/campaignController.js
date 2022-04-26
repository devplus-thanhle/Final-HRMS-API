const campaignServices = require("../services/campaignService");
const Campaigns = require("../models/campaignModel");
const campaignCtrl = {
  createCampaign: async (req, res, next) => {
    const result = await campaignServices.createCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Create Campaign Success", result });
  },
  getAllCampaign: async (req, res, next) => {
    const result = await campaignServices.getAllCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Get All Campaign Success", result });
  },
};

module.exports = campaignCtrl;
