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
  updateCampaign: async (req, res, next) => {
    const result = await campaignServices.updateCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Update Campaign Success", result });
  },
  disableCampaign: async (req, res, next) => {
    const result = await campaignServices.disableCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Disable Campaign Success", result });
  },
  activeCampaign: async (req, res, next) => {
    const result = await campaignServices.activeCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Active Campaign Success", result });
  },
};

module.exports = campaignCtrl;
