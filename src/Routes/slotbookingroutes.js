const slotbookingController = require("../Controllers/slotbookingController");
const express = require("express");
const router = express.Router();

router.post("/bookslot", slotbookingController.bookSlot);
router.get("/getslots", slotbookingController.getSlots);
router.put("/updateslot", slotbookingController.updateSlot);
router.delete("/deleteslot", slotbookingController.deleteSlot);
module.exports = router;