const app = require('express').Router();
const bcrypt = require("bcrypt");   
const {candidateSchema, adminSchema, q10Schema, q20Schema,q30Schema} = require("./config.js");
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "login.jsx");
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + "register.jsx");
});
app.post('/marks10', (req, res) => {
   const questions = {
    quest: req.body.quest,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
   };
    const newQ10 = new q10Schema(questions);
    newQ10.save()
    .then(()=> {
        res.send("Question added successfully");
    })
    .catch(()=> {
        res.send("Error in adding question");
    });
  
});
app.post('/q20/:q20/:option1/:option2/:option3/:option4/:answer', (req, res) => {
   const questions ={
    quest: req.body.quest,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
   };
    const newQ20 = new q20Schema(questions);
    newQ20.save()
    .then(()=> {
        res.send("Question added successfully");
    })
    .catch(()=> {
        res.send("Error in adding question");
    });
   
});
app.post('/q30/:q30/:option1/:option2/:option3/:option4/:answer', (req, res) => {   
    const questions = {
    quest: req.body.quest,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    answer: req.body.answer
   };
    const newQ30 = new q30Schema(questions);
    newQ30.save()
    .then(()=> {
        res.send("Question added successfully");
    })
    .catch(()=> {
        res.send("Error in adding question");
    });
});
app.get('/getq10',async(req,res)=>{
    const questions = await q10Schema.find();
    res.send(questions);
})
app.get('/getq20',async(req,res)=>{
    const questions = await q20Schema.find();
    res.send(questions);
})
app.get('/getq30',async(req,res)=>{
    const questions = await q30Schema.find();
    res.send(questions);
})
