const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Importing routers
const adminRouter = require("./src/Routes/adminroutes.js");
const candidateRouter = require("./src/Routes/candidatesroutes.js");
const questionsRouter = require("./src/Routes/questionsroutes.js");
const registerCandidateRouter = require("./src/Routes/locationroutes.js");

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(express.json());
const corsOptions = { origin: "http://localhost:5174" };
app.use(cors(corsOptions));

// Database connection
mongoose.connect("mongodb://localhost:27017/Exam", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to the server");
}).catch((error) => {
  console.error("Error in connecting to the server:", error);
});

// Use routers
app.use('/api', adminRouter);
app.use('/api', candidateRouter);
app.use('/api', questionsRouter);
app.use('/api', registerCandidateRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
