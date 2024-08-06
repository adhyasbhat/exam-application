const express = require("express");
const { upload, candidateController } = require("../Controllers/candidatescontrollers.js");
const router = express.Router();

const cpUpload = upload.fields([
    { name: 'profilepic', maxCount: 1 },
    { name: 'signaturepic', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]);
  
router.post("/registerCandidate", candidateController.registerCandidate);
router.post("/loginCandidate", candidateController.loginCandidate);
router.post('/update-candidate', cpUpload, candidateController.updateCandidate);
router.post("/sendOTP", candidateController.sendOTP);
router.post("/verifyOTP", candidateController.verifyOTP);
router.get("/getCandidates",candidateController.candidateView);
router.get("/getSingleCandidate",candidateController.singleView)

module.exports = router;