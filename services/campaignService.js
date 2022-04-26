const { campaignValidateCreate } = require("../helpers/validation");
const createError = require("http-errors");
const Campaigns = require("../models/campaignModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const campaignServices = {
  createCampaign: async (req, next) => {
    try {
      const { error } = campaignValidateCreate(req.body);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }
      const {
        title,
        description,
        address,
        startDate,
        endDate,
        quantity,
        position,
        technology,
      } = req.body;
      const img = await cloudinary.uploader.upload(req.file.path);
      if (!img) {
        throw createError.BadRequest("Upload image failed");
      }

      const newCampaign = new Campaigns({
        title,
        description,
        address,
        startDate,
        endDate,
        quantity,
        position,
        technology,
        image: img.secure_url,
      });

      return await newCampaign.save();
    } catch (error) {
      next(error);
    }
  },
  sortCampaignbyQuantity: async (req, next, res) => {
    try {
      const sortDirection = req.query.sortDirection || "";

      const sortQuantity =
        sortDirection === "ascend"
          ? { quantity: 1 }
          : sortDirection === "descend"
          ? { quantity: -1 }
          : sortDirection === "";

      const features = new APIFeatures(
        Campaigns.find().sort(sortQuantity),
        req.query
      );
      const result = await Promise.allSettled([
        features.query,
        Campaigns.countDocuments(),
      ]);
      const campaigns = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      if (!campaigns) throw createError.NotFound("Campaign not found");

      return {
        campaigns,
        count,
      };
    } catch (error) {
      next(error);
    }
  },
  sortCampaignbyTitle: async (req, next, res) => {
    try {
      const sortDirection = req.query.sortDirection || "";
      const sortTitle =
        sortDirection === "ascend"
          ? { title: 1 }
          : sortDirection === "descend"
          ? { title: -1 }
          : sortDirection === "";
      const features = new APIFeatures(
        Campaigns.find({}).sort(sortTitle),
        req.query
      );
      const result = await Promise.allSettled([
        features.query,
        Campaigns.countDocuments(),
      ]);
      const campaigns = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      if (!campaigns) throw createError.NotFound("Campaign not found");

      return {
        campaigns,
        count,
      };
    } catch (error) {
      next(error);
    }
  },
  sortCampaignbyStartDate: async (req, next, res) => {
    try {
      const sortDirection = req.query.sortDirection || "";
      const sortStartDate =
        sortDirection === "ascend"
          ? { startDate: 1 }
          : sortDirection === "descend"
          ? { startDate: -1 }
          : sortDirection === "";
      const features = new APIFeatures(
        Campaigns.find({}).sort(sortStartDate),
        req.query
      );
      const result = await Promise.allSettled([
        features.query,
        Campaigns.countDocuments(),
      ]);
      const campaigns = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      if (!campaigns) throw createError.NotFound("Campaign not found");

      return {
        campaigns,
        count,
      };
    } catch (error) {
      next(error);
    }
  },
  sortCampaignbyEndDate: async (req, next, res) => {
    try {
      const sortDirection = req.query.sortDirection || "";
      const sortEndDate =
        sortDirection === "ascend"
          ? { endDate: 1 }
          : sortDirection === "descend"
          ? { endDate: -1 }
          : sortDirection === "";
      const features = new APIFeatures(
        Campaigns.find({}).sort(sortEndDate),
        req.query
      );
      const result = await Promise.allSettled([
        features.query,
        Campaigns.countDocuments(),
      ]);
      const campaigns = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      if (!campaigns) throw createError.NotFound("Campaign not found");

      return {
        campaigns,
        count,
      };
    } catch (error) {
      next(error);
    }
  },
};

module.exports = campaignServices;
