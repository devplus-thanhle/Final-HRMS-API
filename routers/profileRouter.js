const router = require("express").Router();
const profileCtrl = require("../controllers/profileController");
const upload = require("../helpers/upload.multer");

router.post(
  "/create-profile",
  upload.fields([
    {
      name: "pdf",
      maxCount: 1,
    },
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  profileCtrl.createProfile
);
router.patch("/change-status-profile/:id", profileCtrl.changeStatusProfile);

module.exports = router;
