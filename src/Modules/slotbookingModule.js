const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotdate: { type: Date },
  batch: { type: String }, // e.g., "10am-11am", "2pm-3pm"
  maxSlotsPerBatch: { type: Number },
  availableSlots: { type: Number },
  slotstatus: { type: String },
});
const slotbookingSchema = new mongoose.Schema({
    districtname: {
      type: String,
    },
    slotData: [slotSchema],
  });
  module.exports = mongoose.model('SlotBooking', slotbookingSchema);
