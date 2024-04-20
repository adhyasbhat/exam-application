const express = require("express");
const appRouter = require("./routes.js");   
const app = express();
app.use(express.json());
app.use('/api', appRouter);
const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});