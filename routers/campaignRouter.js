const router = require("express").Router();
const campaignCtrl = require("../controllers/campaignController");
const upload = require("../helpers/upload.multer");

router.post(
  "/create-campaign",
  upload.single("recfile"),
  campaignCtrl.createCampaign
);
router.get("/get-all-campaign", campaignCtrl.getAllCampaign);
router.get("/get-campaign/:id", campaignCtrl.getCampaignById);

router.patch(
  "/update-campaign/:id",
  upload.single("recfile"),
  campaignCtrl.updateCampaign
);
router.patch("/disable-campaign/:id", campaignCtrl.disableCampaign);
router.patch("/active-campaign/:id", campaignCtrl.activeCampaign);
module.exports = router;
