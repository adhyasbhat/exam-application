const {q10Schema, q20Schema, q30Schema} = require('../../config.js');

const questionsController = {}

questionsController.marks10 = async (req, res) => {
    try {
        const questions = {
          question: req.body.quest,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          answer: req.body.answer,
        };
    
        const newQ10 = new q10Schema(questions);
        await newQ10.save();
        res.send("Question added successfully");
      } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).send("Error in adding question: " + error.message);
      }
}

questionsController.marks20 = async (req, res) => {
    try {
        const questions = {
          question: req.body.quest,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          answer: req.body.answer,
        };
    
        const newQ20 = new q20Schema(questions);
        await newQ20.save();
        res.send("Question added successfully");
      } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).send("Error in adding question: " + error.message);
      }
}
questionsController.marks30 = async (req, res) => {
    try {
        const questions = {
          question: req.body.quest,
          option1: req.body.option1,
          option2: req.body.option2,
          option3: req.body.option3,
          option4: req.body.option4,
          answer: req.body.answer,
        };
    
        const newQ30 = new q30Schema(questions);
        await newQ30.save();
        res.send("Question added successfully");
      } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).send("Error in adding question: " + error.message);
      }
}
questionsController.getq10 = async (req, res) => {
    const questions = await q10Schema.find();
    res.send(questions);
}
questionsController.getq20 = async (req, res) => {
    const questions = await q20Schema.find();
    res.send(questions);
}
questionsController.getq30 = async (req, res) => {
    const questions = await q30Schema.find();
    res.send(questions);
}
module.exports = questionsController;