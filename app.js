const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

// Parse JSON bodies

// Importing routers
const adminRouter = require("./src/Routes/adminroutes.js");
const candidateRouter = require("./src/Routes/candidatesroutes.js");
const questionsRouter = require("./src/Routes/questionsroutes.js");
const registerCandidateRouter = require("./src/Routes/locationroutes.js");
const slotbookingroutes = require("./src/Routes/slotbookingroutes.js");
const kgidcandidatesroutes = require("./src/Routes/kgidcandidatesroutes.js");
const candidateresponseroutes = require('./src/Routes/candidateresponseroutes.js')

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware setup
app.use(express.json());
// const corsOptions = { origin: "http://localhost:5174" };
const corsOptions = { origin: "http://localhost:3000" };

app.use(cors(corsOptions));

// Database connection
mongoose.connect("mongodb://localhost:27017/Exam", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Adjust as necessary
  socketTimeoutMS: 45000 // Adjust as necessary
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
app.use('/api', slotbookingroutes);
app.use('/api', kgidcandidatesroutes);
app.use('/api', candidateresponseroutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
