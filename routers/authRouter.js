const router = require("express").Router();
const authCtrl = require("../controllers/authController");

router.post("/login", authCtrl.login);
router.post("/refresh-token", authCtrl.refreshToken);
router.delete("/logout", authCtrl.logout);

module.exports = router;
