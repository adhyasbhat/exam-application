// const app = require('express').Router();
// const bcrypt = require("bcrypt");
// const {candidateSchema, adminSchema, q10Schema, q20Schema,q30Schema} = require("./config.js");
// app.use(express.static(__dirname));
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const nodemailer = require("nodemailer");
const {
  candidateSchema,
  adminSchema,
  q10Schema,
  q20Schema,
  q30Schema,
  districtSchema,
} = require("./config.js");
const path = require("path");
// router.use(express.static(__dirname));
// router.get("/", (req, res) => {
//     res.sendFile(__dirname + "login.jsx");
// });
// router.get('/register', (req, res) => {
//     res.sendFile(__dirname + "register.jsx");
// });

router.post("/adminregister",async(req,res)=>{
    try {
        const admin = {
            username: req.body.username,
            password: req.body.password
        };
        const newAdmin = new adminSchema(admin);
        await newAdmin.save();
        res.send("Admin registered successfully");
    } catch (error) {  
        console.error("Error registering admin:", error);   
        res.status(500).send("Error in registering admin: " + error.message);
    }
})
router.post("/registerCandidate", async (req, res) => {
    try{
        const candidate = {
            name: req.body.name,
            email: req.body.email
        };
        const newCandidate = new candidateSchema(candidate);
        await newCandidate.save();
        res.send("Candidate added successfully");
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
});
router.put("/updateCandidate", async (req, res) => {
    try {
        const candidate = await candidateSchema.findOne({ email: req.body.email });
        if (candidate) {
            candidate.phone = req.body.phone;
            candidate.dob = req.body.dob;
            await candidate.save();
            res.send("Candidate updated successfully");
        } else {
            res.status(404).send("Candidate not found");
        }
}
catch (error) {
    console.error("Error updating candidate:", error);
    res.status(500).send("Error in updating candidate: " + error.message);
}
}
);
router.post("/findCandidate", async (req, res) => {
    try {
      const candidate = await candidateSchema.findOne({ email: req.body.email });
        if (candidate) {  
          const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: "pokemonpodedex@gmail.com",
              pass: "uvpesguptqmwcspb",
            },
          });
          const mailOptions = {
            from: {
              name: "CSG Team",
              address: "pokemonpodedex@gmail.com",
            },
            to: req.body.email,
            subject: "Verification OTP",
            text: "Dear user,\n\nWe've received a request for your OTP",
            html: `<p>Congratulations on progressing in our application process!</p><p> Your OTP for further steps is 1234 </p><p>Thank you,<br>CSG Team</p>`,
          };
          const sendMail = async (transporter, mailOptions) => {
            try {
              await transporter.sendMail(mailOptions);
              console.log("mail has been sent!!");
              res.status(200).json({ message: "mail has been sent"});
            } catch (error) {
              console.log(error);
            }
          };
          sendMail(transporter, mailOptions);
      
        } else {  
            res.status(404).send("Candidate not found");
        }
    } catch (error) {
        console.error("Error finding candidate:", error);
        res.status(500).send("Error in finding candidate: " + error.message);
    }
});
router.post("/marks10", async (req, res) => {
  try {
    const questions = {
      question: req.body.quest,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
    };

    const newQ10 = new q10Schema(questions);
    await newQ10.save();
    res.send("Question added successfully");
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send("Error in adding question: " + error.message);
  }
});
router.post("/marks20", async (req, res) => {
  try {
    const questions = {
      question: req.body.quest,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
    };

    const newQ20 = new q20Schema(questions);
    await newQ20.save();
    res.send("Question added successfully");
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send("Error in adding question: " + error.message);
  }
});
router.post("/marks30", async (req, res) => {
  try {
    const questions = {
      question: req.body.quest,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
    };

    const newQ30 = new q30Schema(questions);
    await newQ30.save();
    res.send("Question added successfully");
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).send("Error in adding question: " + error.message);
  }
});
router.post("/district", async (req, res) => {
  try {
    const district = {
      districtname: req.body.districtname,
      districtcode: req.body.districtcode,
    };
    const newDistrict = new districtSchema(district);
    await newDistrict.save();
    res.send("District added successfully");
  } catch (error) {
    console.error("Error adding district:", error);
    res.status(500).send("Error in adding district: " + error.message);
  }
});
router.get("/getq10", async (req, res) => {
  const questions = await q10Schema.find();
  res.send(questions);
});
router.get("/getq20", async (req, res) => {
  const questions = await q20Schema.find();
  res.send(questions);
});
router.get("/getq30", async (req, res) => {
  const questions = await q30Schema.find();
  res.send(questions);
});
router.get("/getdistrict", async (req, res) => {
  const district = await districtSchema.find();
  res.send(district);
});
module.exports = router;
