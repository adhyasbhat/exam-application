const questionsController = require("../Controllers/questionscontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/marks10", questionsController.marks10);
router.post("/marks20",questionsController.marks20);
router.post("/marks30", questionsController.marks30);

router.get("/getq10", questionsController.getq10);
router.get("/getq20", questionsController.getq20);
router.get("/getq30", questionsController.getq30);

module.exports = router;