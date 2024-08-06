const Answer = require("../Modules/candidateresponseModule.js");


const answerController = {};

answerController.addAnswer = async (req, res) => {
  try {
    const answer = {
      email: req.body.email,
      name: req.body.name,
      question: req.body.question,
      answer: req.body.answer,
      correctAnswer: req.body.correctAnswer,
      category: req.body.category,
      year: req.body.year,
    };

    const newAnswer = new Answer(answer);
    await newAnswer.save();
    res.send("Answer added successfully");
  } catch (error) {
    console.error("Error adding answer:", error);
    res.status(500).send("Error in adding answer: " + error.message);
  }
};
answerController.getAllUserAnswer = async (req, res) => {
  const answers = await Answer.find();
  res.send(answers);
}
answerController.getAnswerByEmail = async (req, res) => {
  const answers = await Answer.find({ email: req.body.email });
    res.send(answers);
}