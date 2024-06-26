const {candidateSchema } = require("../../config.js");
const nodemailer = require("nodemailer");
const candidateController = {}
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
candidateController.registerCandidate = async (req, res) => {
    try{
        const candidate = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob
        };
        const newCandidate = new candidateSchema(candidate);
        await newCandidate.save();
        const token = jwt.sign({ email: email }, jwtPassword, { expiresIn: "2h" });
        return res.status(200).json({ success: "Successfull added candidate", token });
    } catch (error) {
        console.error("Error adding candidate:", error);
    }
}
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
        const sendMail = async (transporter, mailOptions) => {
          try {
            await transporter.sendMail(mailOptions);
            console.log("mail has been sent!!");
            res.status(200).json({ message: "mail has been sent", status: "success"});
          } catch (error) {
            console.log(error);
          }
        };
        sendMail(transporter, mailOptions);
    
      
  } catch (error) {
      console.error("Error finding candidate:", error);
      res.status(500).send("Error in finding candidate: " + error.message);
  }
}
candidateController.updateCandidate = async (req, res) => {
    try {
                const candidate = await candidateSchema.findOne({ email: req.body.email });
                if (candidate) {
                    candidate.phone = req.body.phone;
                    candidate.dob = req.body.dob;
                    candidate.name = req.body.name;
                    candidate.email = req.body.email;
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
candidateController.loginCandidate = async (req, res) => {
    try {
        const candidate = await candidateSchema.findOne({ email: req.body.email });
        if (candidate) {
            if (candidate.password === req.body.password) {
                const token = jwt.sign({ email: candidate.email }, jwtPassword, { expiresIn: "2h" });
                res.status(200).json({ success: "Login successfull", token });
            } else {
                res.status(401).send("Incorrect password");
            }
        } else {
            res.status(404).send("Candidate not found");
        }
    }
    catch (error) {
        console.error("Error logging in candidate:", error);
        res.status(500).send("Error in logging in candidate: " + error.message);
    }
}
module.exports = candidateController;