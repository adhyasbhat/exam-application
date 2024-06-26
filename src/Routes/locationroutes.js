const locationController = require("../Controllers/locationcontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/district", locationController.addDistrict);
router.get("/getdistrict", locationController.getDistrict);

module.exports = router;