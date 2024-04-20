// const app = require('express').Router();
// const bcrypt = require("bcrypt");   
// const {candidateSchema, adminSchema, q10Schema, q20Schema,q30Schema} = require("./config.js");
// app.use(express.static(__dirname));
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const { candidateSchema, adminSchema, q10Schema, q20Schema, q30Schema } = require("./config.js");
const path = require('path');
// router.use(express.static(__dirname));
// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "login.jsx");
// });
// router.get('/register', (req, res) => {
//     res.sendFile(__dirname + "register.jsx");
// });
router.post('/marks10', async (req, res) => {
    try {
        const questions = {
            question: req.body.quest,
            option1: req.body.option1,
            option2: req.body.option2,
            option3: req.body.option3,
            option4: req.body.option4,
            answer: req.body.answer
        };

        const newQ10 = new q10Schema(questions);
        await newQ10.save();
        res.send("Question added successfully");
    } catch (error) {
        console.error("Error adding question:", error);
        res.status(500).send("Error in adding question: " + error.message);
    }
});

router.post('/marks20', (req, res) => {
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
router.post('/marks30', (req, res) => {   
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
router.get('/getq10',async(req,res)=>{
    const questions = await q10Schema.find();
    res.send(questions);
})
router.get('/getq20',async(req,res)=>{
    const questions = await q20Schema.find();
    res.send(questions);
})
router.get('/getq30',async(req,res)=>{
    const questions = await q30Schema.find();
    res.send(questions);
})
module.exports = router;