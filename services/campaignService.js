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
};

module.exports = campaignServices;
