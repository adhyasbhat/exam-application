require('dotenv').config();
const { DeptAdmin}=require('../Modules/adminModule');
const nodemailer = require('nodemailer');



const SendMail =async (req, res) => {
    const { email } = req.body;
    

 
    const admin = await DeptAdmin.findOne({ email });
    
    if (!admin) {
      return res.status(400).send('admin is not found with this mail.');
    }
  
  

  
   
    const transporter = nodemailer.createTransport({
        service: "outlook",
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

    
    const mailOptions = {
        from: {
          name: "CSG Team",
          address: process.env.EMAIL,
        },
        to: admin.email,
        subject: "Slot Approval Request",
        text:`You have recieved exam request from candidates.\n\n
         Please click on the following link, or paste this into your browser to view:\n\n
          ${process.env.FRONTEND_URL}/AdminLoginPage\n\nThank you,CSG Team` ,
       
      };
    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).send('Error sending email.');
      res.status(200).send('Email sent.');
    });
  };

  module.exports = { SendMail };