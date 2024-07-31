const express = require("express");
const candidateController = require("../Controllers/candidatescontrollers.js");
const router = express.Router();

router.post("/registerCandidate", candidateController.registerCandidate);
router.post("/loginCandidate", candidateController.loginCandidate);
router.put("/updateCandidate", candidateController.updateCandidate);
router.post("/sendOTP", candidateController.sendOTP);
router.post("/verifyOTP", candidateController.verifyOTP);

module.exports = router;
