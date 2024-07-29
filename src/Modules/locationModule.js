const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  districtname: {
    type: String,
  },
  districtcode: {
    type: Number,
  },
});

module.exports = mongoose.model('DistrictName', districtSchema);
