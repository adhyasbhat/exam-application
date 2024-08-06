const {BookSlot,viewBook, getTimeSlots} = require("../Controllers/slotbookingcontrollers");
const express = require("express");
const router = express.Router();
const verifyToken = require("../Servives/verifyToken");
router.post('/insertBook',verifyToken,BookSlot);
router.get('/getBook/:user_id',viewBook);
router.post('/getTimeSlot',getTimeSlots)
module.exports = router;