const { campaignValidateCreate } = require("../helpers/validation");
const createError = require("http-errors");
const Campaigns = require("../models/campaignModel");
const cloudinary = require("cloudinary").v2;
const APIFeatures = require("../helpers/feature");

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
  getAllCampaign: async (req, next) => {
    try {
      const features = new APIFeatures(
        Campaigns.find(),
        req.query
      ).paginating();

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
  updateCampaign: async (req, next) => {
    try {
      const {
        title,
        description,
        address,
        startDate,
        endDate,
        quantity,
        position,
        technology
      } = req.body;

      const campaign = await Campaigns.findById(req.params.id);
      const { image } = campaign;
      const tmp = req.file;
      let img;

      if (!tmp) {
        img = image;
      } else {
        img = await cloudinary.uploader.upload(req.file.path);
      }

      const newCampaign = await Campaigns.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          description,
          address,
          startDate,
          endDate,
          quantity,
          position,
          technology,
          image: img.secure_url ? img.secure_url : image,
        },
        {
          new: true,
        }
      );
      if (!newCampaign) throw createError.BadRequest("Campaign not found");
      return newCampaign;
    } catch (error) {}
  },
};

module.exports = campaignServices;
