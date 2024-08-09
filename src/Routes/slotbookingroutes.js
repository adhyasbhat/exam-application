const {BookSlot,viewBook,getTimeSlots,viewbookedcandidateDetails} = require("../Controllers/slotbookingcontrollers");
const express = require("express");
const router = express.Router();
const verifyToken = require("../Servives/verifyUser");
router.post('/insertBook',verifyToken,BookSlot);
router.get('/getBook/:email',viewBook); // get candidate booking details by id
router.get('/getbookedCandidateList',viewbookedcandidateDetails) // get all the candidate list who has booked 
router.post('/getTimeSlot',getTimeSlots)
module.exports = router;