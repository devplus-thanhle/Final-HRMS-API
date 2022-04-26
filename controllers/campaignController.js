const campaignServices = require("../services/campaignService");
const Campaigns = require("../models/campaignModel");
const campaignCtrl = {
  createCampaign: async (req, res, next) => {
    const result = await campaignServices.createCampaign(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Create Campaign Success", result });
  },
  sortCampaignbyQuantity: async (req, res, next) => {
    const result = await campaignServices.sortCampaignbyQuantity(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Sort Campaign Success", result });
  },
  sortCampaignbyTitle: async (req, res, next) => {
    const result = await campaignServices.sortCampaignbyTitle(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Sort Campaign Success", result });
  },
  sortCampaignbyStartDate: async (req, res, next) => {
    const result = await campaignServices.sortCampaignbyStartDate(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Sort Campaign Success", result });
  },
  sortCampaignbyEndDate: async (req, res, next) => {
    const result = await campaignServices.sortCampaignbyEndDate(req, next);
    if (!result) return;
    res.status(200).json({ msg: "Sort Campaign Success", result });
  },
};

module.exports = campaignCtrl;
