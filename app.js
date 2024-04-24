const express = require("express");
const adminRouter = require("./src/Routes/adminroutes.js"); 
const candidateRouter = require("./src/Routes/candidatesroutes.js");
const questionsRouter = require("./src/Routes/questionsroutes.js");
const registerCandidate = require("./src/Routes/registerroutes.js");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', adminRouter);
app.use('/api', candidateRouter);
app.use('/api', questionsRouter);
app.use('/api', registerCandidate);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
