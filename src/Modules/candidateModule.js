const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
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
  password: {
    type: String,
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
  profilepic:{
    type:String,
  },
  signaturepic:{
    type:String,
  },
  resume:{
    type:String,
  }
}
);

module.exports = mongoose.model('Candidate', candidateSchema);
