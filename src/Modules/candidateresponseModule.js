const mongoose = require('mongoose');
const userAnswerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  year:{
    type: String,
    required: true
  },
  month:{
    type:String,
    required:true
  },
  category: {
    type: String,
    required: true
  },
  time:{
    type:String,
  },
  accuracy:{
    type:Number
  },
  responses: [{
    question: String,
    answer: String,
    correctAnswer: String,
  }],
  score: {
    type: Number,
  }
  });
  module.exports = mongoose.model('UserAnswer', userAnswerSchema);