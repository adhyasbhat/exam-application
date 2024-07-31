const Candidate = require("../Modules/candidateModule");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const candidateController = {};
const jwtPassword = "secret";

candidateController.registerCandidate = async (req, res) => {
    try {
        const candidate = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            password: req.body.password,
        };
        const newCandidate = new Candidate(candidate);
        await newCandidate.save();
        const token = jwt.sign({ email: req.body.email }, jwtPassword, { expiresIn: "2h" });
        return res.status(200).json({ success: "Successfully added candidate", token });
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
                return res.status(400).send("Password fields cannot be empty");
            }
            if (req.body.password !== req.body.confirmPassword) {
                return res.status(400).send("Passwords do not match");
            }
            if (passwordRegex.test(req.body.password)) {
                candidate.phone = req.body.phone;
                candidate.dob = req.body.dob;
                candidate.name = req.body.name;
                candidate.email = req.body.email;
                candidate.password = req.body.password;
                candidate.address = req.body.address;
                candidate.profilepic = req.body.profilepic;
                candidate.signaturepic = req.body.signaturepic;
                candidate.resume = req.body.resume;
                candidate.role = req.body.role;
                candidate.currentCompany = req.body.currentCompany;
                candidate.experience = req.body.experience;
                candidate.gender = req.body.gender;
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
};
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
        if (candidate) {
            if (candidate.password === req.body.password) {
                const token = jwt.sign({ email: candidate.email }, jwtPassword, { expiresIn: "2h" });
                res.status(200).json({ success: "Login successful", token });
            } else {
                res.status(401).send("Incorrect password");
            }
        } else {
            res.status(404).send("Candidate not found");
        }
    } catch (error) {
        console.error("Error logging in candidate:", error);
        res.status(500).send("Error logging in candidate: " + error.message);
    }
};

module.exports = candidateController;
