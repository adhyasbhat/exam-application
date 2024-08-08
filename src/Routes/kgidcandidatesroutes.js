const express = require("express");
const router = express.Router();
const {upload, KGIDCandidateController } = require("../Controllers/kgidcandidatecontrollers");

const cpUpload = upload.fields([
    { name: 'profilepic', maxCount: 1 },
    { name: 'signaturepic', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]);
  
  router.post("/loginKGIDCandidate", KGIDCandidateController.loginKGIDCandidate);
  router.put("/updateKGIDCandidate", cpUpload, KGIDCandidateController.updateKGIDCandidate);
  router.get("/kgidCandidateView", KGIDCandidateController.getKGIDCandidate);
router.get("/singleKGIDCandidateView", KGIDCandidateController.getSingleKGIDCandidate);

module.exports = router;