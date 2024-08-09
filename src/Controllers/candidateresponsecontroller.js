const Answer = require("../Modules/candidateresponseModule.js");
const calculateScore = require("../Servives/scoreCalculation.js")
const answerController = {};

answerController.getCandidateResponse = async (req, res) => {
  try {
    const { email, name, year, month, category,time,accuracy, responses } = req.body;

    // Check if an entry exists for the given email, name, year, and month
    let existingEntry = await Answer.findOne({ email, name, year, month });

    if (existingEntry) {
      return res.status(400).send("Responses already submitted for this month and year.");
    } else {
      const newAnswer = new Answer({
        email,
        name,
        year,
        month,
        category,
        time,
        accuracy,
        responses,
        score: calculateScore(responses)
      });
      await newAnswer.save();
    }

    res.send("Answers added successfully");
  } catch (error) {
    console.error("Error adding answers:", error);
    res.status(500).send("Error in adding answers: " + error.message);
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
module.exports = answerController;