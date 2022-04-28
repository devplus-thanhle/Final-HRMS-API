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
  changeStatusProfile: async (req, next) => {
    try {
      const { reason } = req.body;

      console.log(reason);

      const change = async () => {
        const result = await Profiles.findByIdAndUpdate(
          req.params.id,
          {
            $set: { status: req.body.status },
          },
          { new: true }
        ).populate("campaignId");

        if (!result) throw createError.NotFound("Profile not found");
        return result;
      };

      const res = await Profiles.findById(req.params.id);

      switch (req.body.status) {
        case "reject":
          if (res.status === "reject") {
            throw createError.BadRequest("Profile is already reject");
          }
          const rej = await change();
          // await sendEmailReject({ toUser: rej, reason });
          return rej;

        case "pending":
          // if (res.status === "test") {
          //   throw createError.BadRequest("Profile is already test");
          // }
          const pending = change();
          // await sendEmailStatusTest({ toUser: test, time, date });
          return pending;
        case "passed":
          // if (res.status === "interview") {
          //   throw createError.BadRequest("Profile is already interview");
          // }
          const passed = await change();
          // await sendEmailStatusInterview({ toUser: interview, time, date });
          return passed;

        default:
          break;
      }
    } catch (error) {
      next(error);
    }
  },
  getAllProfiles: async (req, next) => {
    try {
      const search = req.query.search;
      const step = req.query.step;
      const status = req.query.status;

      const features = new APIFeatures(
        Profiles.find({
          $and: [
            {
              $or: [
                { fullname: { $regex: new RegExp(search), $options: "i" } },
                { email: { $regex: new RegExp(search), $options: "i" } },
                {
                  phone: { $regex: new RegExp(search) },
                },
                {
                  step: { $regex: new RegExp(search), $options: "i" },
                },
                {
                  status: { $regex: new RegExp(search), $options: "i" },
                },
                { detail: { $regex: new RegExp(search), $options: "i" } },
              ],
            },
            {
              $or: [
                { step: { $regex: new RegExp(step), $options: "i" } },
                {
                  status: { $regex: new RegExp(status), $options: "i" },
                },
              ],
            },
            {
              $or: [
                {
                  $and: [
                    { step: { $regex: new RegExp(step), $options: "i" } },
                    {
                      status: { $regex: new RegExp(status), $options: "i" },
                    },
                  ],
                },
              ],
            },
          ],
        }),
        req.query
      )
        .paginating()
        .sorting();

      const result = await Promise.allSettled([
        features.query,
        Profiles.countDocuments(),
      ]);
      const profiles = result[0].status === "fulfilled" ? result[0].value : [];
      const count = result[1].status === "fulfilled" ? result[1].value : 0;

      if (!profiles) {
        throw createError.NotFound("Not found");
      }
      return { profiles, count, page: Number(req.query.page) };
    } catch (error) {
      next(error);
    }
  },
  changeStepProfile: async (req, next) => {
    try {
      const { time, date } = req.body;

      const change = async () => {
        const result = await Profiles.findByIdAndUpdate(
          req.params.id,
          {
            $set: { step: req.body.step },
          },
          { new: true }
        ).populate("campaignId");

        if (!result) throw createError.NotFound("Profile not found");
        return result;
      };

      const res = await Profiles.findById(req.params.id);

      switch (req.body.step) {
        // case "reject":
        //   if (res.status === "reject") {
        //     throw createError.BadRequest("Profile is already reject");
        //   }
        //   const rej = await change();
        //   // await sendEmailReject({ toUser: rej, reason });
        //   return rej;

        case "cvnew":
          // if (res.status === "test") {
          //   throw createError.BadRequest("Profile is already test");
          // }
          const cvnew = change();
          // await sendEmailStatusTest({ toUser: test, time, date });
          return cvnew;
        case "phone":
          // if (res.status === "interview") {
          //   throw createError.BadRequest("Profile is already interview");
          // }
          const phone = await change();
          // await sendEmailStatusInterview({ toUser: interview, time, date });
          return phone;
        case "test":
          // if (res.status === "confirm") {
          //   throw createError.BadRequest("Profile is already pass");
          // }
          const test = change();
          // await sendEmailStatusPass({ toUser: res, time, date });
          return test;
        case "interview":
          const interview = change();
          return interview;
        case "offer":
          const offer = change();
          return offer;
        default:
          break;
      }
    } catch (error) {
      next(error);
    }
  },
};

module.exports = profileServices;
