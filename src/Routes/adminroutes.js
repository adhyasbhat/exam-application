const adminController = require("../Controllers/admincontrollers.js");
const express = require("express");
const router = express.Router();

router.post("/adminregister",adminController.registerAdmin)

module.exports = router;

