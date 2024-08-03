const Candidate = require("../Modules/candidateModule");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer  = require('multer')
const secretKey="adhya";
const path = require('path');
const candidateController = {};
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const userFolder = path.join(__dirname, '../uploads/', req.body.email);
      fs.mkdirSync(userFolder, { recursive: true });
      cb(null, userFolder);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
candidateController.registerCandidate = async (req, res) => {
    try {
      console.log("try block")
        const { name, email, phone,dob, password } = req.body;
        const findEmail = await Candidate.findOne({email});
        if (findEmail) {
          console.log("This email is already exist");
          return res.status(400).json({ error: "email already exits" });
      }
      else{
  console.log("new user")
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
          if (!name ||!password || !email || !phone || !dob) {
            console.log(name, email, phone,dob, password);
            console.log("Name,Email,Phone and Dob fields cannot be empty");
            return res.status(401).send("Name,Email,Phone and Dob fields cannot be empty");
          }
          if (!passwordRegex.test(password)) {
            console.log("Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter");
            return res.status(402).send("Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter");
          }
          console.log("password is valid")
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);
  
        const newCandidate = new Candidate({ name: name, email: email, phone: phone,dob:dob, password: hashPass });
        console.log(newCandidate);
        await newCandidate.save();
        return res.status(200).json({ success: "Successfully added candidate"});
      }
        
    } catch (error) {
        console.error("Error adding candidate:", error);
        res.status(500).send("Error adding candidate: " + error.message);
    }
};

candidateController.sendOTP = async (req, res) => {
    try {
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
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Mail has been sent", status: "success" });
    } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).send("Error sending OTP: " + error.message);
    }
};

  candidateController.updateCandidate = async (req, res) => {
      try {
        const candidate = await Candidate.findOne({ email: req.body.email });
        if (candidate) {
          const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
          
          if (!req.body.password || !req.body.confirmPassword) {
            console.log(req.body.password, req.body.confirmPassword);
            return res.status(400).send("Password fields cannot be empty");
          }
          console.log(req.body.password, req.body.confirmPassword);
          if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).send("Passwords do not match");
          }
          if (passwordRegex.test(req.body.password)) {
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt);
            candidate.phone = req.body.phone;
            candidate.dob = req.body.dob;
            candidate.name = req.body.name;
            candidate.email = req.body.email;
            candidate.password = hashPass;
            candidate.address = req.body.address;
            candidate.role = req.body.role;
            candidate.currentCompany = req.body.currentCompany;
            candidate.experience = req.body.experience;
            candidate.gender = req.body.gender;
            
            // Save file paths if files were uploaded
            if (req.files['profilepic']) {
              candidate.profilepic = req.files['profilepic'][0].path;
            }
            if (req.files['signaturepic']) {
              candidate.signaturepic = req.files['signaturepic'][0].path;
            }
            if (req.files['resume']) {
              candidate.resume = req.files['resume'][0].path;
            }
            await candidate.save();
            res.send("Candidate updated successfully");
          } else {
            res.status(400).send("Password should be at least 6 characters long and should contain at least one number, one lowercase, and one uppercase letter");
          }
        } else {
          res.status(404).send("Candidate not found");
        }
      } catch (error) {
        console.error("Error updating candidate:", error);
        res.status(500).send("Error updating candidate: " + error.message);
      }
    }
  
candidateController.verifyOTP = async (req, res) => {
    try {
        if (req.body.otp === "1234") {
            res.status(200).send("OTP verified successfully");
        } else {
            res.status(401).send("Incorrect OTP");
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).send("Error verifying OTP: " + error.message);
    }
};
candidateController.loginCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ email: req.body.email });
        if(!candidate){
          return res.status(400).json({ error: "email does not exits" });
        }
        const decryptPassword = await bcrypt.compare(req.body.password, candidate.password);
        if(!decryptPassword){
          return res.status(400).json({ error: "password does not exits" });
        }
        const idData= candidate.id;
console.log(idData,"iddata");
console.log(secretKey,"secretkey");
      const token=await jwt.sign({id:idData},secretKey);
     console.log(token, "new token");
      const success=true;
      console.log(token,"token in login",success,candidate);
      res.status(200).json({success,token,candidate});

    }catch(err){
        console.log("insertion unsuccessfull", err);
        res.status(500).json({ error: 'insertion unsuccessfull' })
    }
};

module.exports = {upload,candidateController};
