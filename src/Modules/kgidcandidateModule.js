const mongoose = require('mongoose');

const KGIDcandidateSchema = new mongoose.Schema({
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'booking',
  },
  name: {
    type: String,
  },
  KGID:{
    type:Number
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  dob: {
    type: Date,
  },
  doj: {
    type: Date,
  },
  address:{
    type:String,
  },
  role:{
    type:String,
  },
  currentCompany:{
    type:String,
  },
  experience:{
    type:Number,
  },
  gender:{
    type:String,
  },
  grade:{
    type:String,
  },
  department:{
    type:String,
  },
  candidateDistrict:{
    type:String,
  },

  profilepic:{
    type:String,
  },
  signaturepic:{
    type:String,
  },
  resume:{
    type:String,
  },
  adminApproval:{
    type: String,
    default: 'pending',
  },
  attendence:{
    type: String,
    default: 'pending',
  }
}
);

module.exports = mongoose.model('KGIDCandidate', KGIDcandidateSchema);
