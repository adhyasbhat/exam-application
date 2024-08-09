const mongoose = require('mongoose');

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
  category: {
    type: String,
  },
  year: {
    type: Number,
  },
  month:{
    type:String
  }
});

module.exports = mongoose.model('Question', questionSchema);
