const candidateController = require("../Controllers/candidatescontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/registerCandidate",candidateController.registerCandidate);
// router.put("/updateCandidate", candidateController.updateCandidate);
router.post("/findCandidate", candidateController.sendOTP);

module.exports = router;