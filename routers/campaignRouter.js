const router = require("express").Router();
const campaignCtrl = require("../controllers/campaignController");
const upload = require("../helpers/upload.multer");

router.post(
  "/create-campaign",
  upload.single("recfile"),
  campaignCtrl.createCampaign
);
router.get("/sort-campaign-byQuantity", campaignCtrl.sortCampaignbyQuantity);
router.get("/sort-campaign-byTitle", campaignCtrl.sortCampaignbyTitle);
router.get("/sort-campaign-byStartDate", campaignCtrl.sortCampaignbyStartDate);
router.get("/sort-campaign-byEndDate", campaignCtrl.sortCampaignbyEndDate);
module.exports = router;
