const express = require("express");
const adminRouter = require("./src/Routes/adminroutes.js"); 
const candidateRouter = require("./src/Routes/candidatesroutes.js");
const questionsRouter = require("./src/Routes/questionsroutes.js");
const registerCandidate = require("./src/Routes/locationroutes.js");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(express.json());
const corsOptions = {origin: "http://localhost:5174"};
app.use(cors(corsOptions))
app.use('/api', adminRouter);
app.use('/api', candidateRouter);
app.use('/api', questionsRouter);
app.use('/api', registerCandidate);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
