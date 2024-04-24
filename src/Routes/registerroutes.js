const registerController = require("../Controllers/registercontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/district", registerController.addDistrict);
router.get("/getdistrict", registerController.getDistrict);

module.exports = router;