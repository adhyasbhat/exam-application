const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/Exam");

connect
  .then(() => {
    console.log("Connected to the server");
  })
  .catch(() => {
    console.log("Error in connecting to the server");
  });
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
  gender:{
    type: String,
  },
  role:{
    type: String,
  },
  currentCompany:{
    type: String,
  },
  experience:{
    type: Number,
  },
  password: {
    type: String,
  },
  address:{
    type: String,
  },
  profilepic:{
    type: String,
  },
  signaturepic:{
    type: String
  },
  resume:{
    type: String
  }
});
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  option1: {
    type: String,
  },
  option2: {
    type: String,
  },
  option3: {
    type: String,
  },
  option4: {
    type: String,
  },
  answer: {
    type: String,
  },
  category:{
    type: String,
  }
});

const districtSchema = new mongoose.Schema({
  districtname: {
    type: String,
  },
  districtcode: {
    type: Number,
  },
});
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

module.exports = {
  questionSchema: mongoose.model("Question", questionSchema),
  candidateSchema: mongoose.model("Candidate", candidateSchema),
  adminSchema: mongoose.model("Admin", adminSchema),
  districtSchema: mongoose.model("DistrictName", districtSchema),
  slotbookingSchema: mongoose.model("SlotBooking", slotbookingSchema),
};
