const Profiles = require("../models/profileModel");
const Campaigns = require("../models/campaignModel");
const { profileValidateCreate } = require("../helpers/validation");
const createError = require("http-errors");
const APIFeatures = require("../helpers/feature");
const {
  sendEmailApplySuccess,
  sendEmailReject,
  sendEmailStatusTest,
  sendEmailStatusInterview,
  sendEmailStatusPass,
} = require("../services/mailService");
const cloudinary = require("cloudinary").v2;
const { uploadfile } = require("../services/upload.file");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const profileServices = {
  createProfile: async (req, next) => {
    try {
      const { error } = profileValidateCreate(req.body);
      if (error) {
        throw createError.BadRequest(error.details[0].message);
      }
      const { fullname, email, phone, detail, id } = req.body;
      const link = await uploadfile(req);
      const pdf = `http://drive.google.com/uc?export=view&id=${link.data.id}`;

      const img = await cloudinary.uploader.upload(req.files.image[0].path);

      if (!img) {
        throw createError.BadRequest("Upload image failed");
      }

      const newProfile = new Profiles({
        fullname,
        email,
        phone,
        detail,
        campaignId: id,
        avatar: img.secure_url,
        cv: pdf,
      });

      await Campaigns.findOneAndUpdate(
        { _id: id },
        {
          $push: { profiles: newProfile._id },
        },
        { new: true }
      );

      await sendEmailApplySuccess({ toUser: newProfile });

      return await newProfile.save();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

module.exports = profileServices;
