const Answer = require("../Modules/candidateresponseModule.js");
const calculateScore = require("../Servives/scoreCalculation.js")
const answerController = {};

answerController.getCandidateResponse = async (req, res) => {
  try {
    const { email, name, date, category,time,accuracy, responses } = req.body;

    // Check if an entry exists for the given email, name, year, and month
    let existingEntry = await Answer.findOne({ email, name, date });

    if (existingEntry) {
      return res.status(400).json({ error: "Responses already submitted for this date." });
    } else {
      const totalQuestions = responses.length;
      const attendedQuestions = responses.filter(response => response.answer !== "").length;
      const wrongAnswers = responses.filter(response => response.answer !== response.correctAnswer).length;
      const newAnswer = new Answer({
        email,
        name,
        date,
        category,
        time,
        accuracy,
        responses,
        score: calculateScore(responses),
        totalQuestions,
        attendedQuestions,
        wrongAnswers
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