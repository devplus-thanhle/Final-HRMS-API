const router = require("express").Router();
const campaignCtrl = require("../controllers/campaignController");
const upload = require("../helpers/upload.multer");

router.post(
  "/create-campaign",
  upload.single("recfile"),
  campaignCtrl.createCampaign
);

module.exports = router;
