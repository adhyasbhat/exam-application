const mongoose = require('mongoose');
const userAnswerSchema = new mongoose.Schema({
    email:{
      type: String,
    },
    name:{
        type:String
    },
    question:{
      type: String,
    },
    answer:{
      type: String,
    },
    correctAnswer:{
      type: String,
    },
    category:{
      type: String,
    },
    year:{
        type:Number
    }
  });
  module.exports = mongoose.model('UserAnswer', userAnswerSchema);