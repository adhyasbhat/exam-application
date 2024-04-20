// const express = require("express");
// const appRouter = require("./routes.js");   
// const app = express();
// app.use(express.json());
// app.use('/api', appRouter);
// const port = 5000;
// app.listen(port, () => {
//     console.log(`Server running on port: ${port}`);
// });
// server.js
const express = require("express");
const appRouter = require("./routes.js");   
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', appRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
