const questionsController = require("../Controllers/questionscontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/postquestion", questionsController.postquestion);
router.get("/getquestion", questionsController.getquestion);


module.exports = router;