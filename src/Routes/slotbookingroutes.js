const {BookSlot,viewBook, getTimeSlots} = require("../Controllers/slotbookingcontrollers");
const express = require("express");
const router = express.Router();
const verifyToken = require("../Servives/verifyUser");
router.post('/insertBook',verifyToken,BookSlot);
router.get('/getBook/:email',viewBook);
router.post('/getTimeSlot',getTimeSlots)
module.exports = router;