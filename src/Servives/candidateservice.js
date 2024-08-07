const otpGenerator = require('otp-generator')
const nodemailer = require("nodemailer");
function generateOTP(){
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    return otp;
}
async function sendOTP(email)
{
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
   
    const otp = generateOTP()

    const mailOptions = {
      from: {
        name: "CSG Team",
        address: "pokemonpodedex@gmail.com",
      },
      to: email,
      subject: "Verification OTP",
      text: "Dear user,\n\nWe've received a request for your OTP",
      html: `<p>Congratulations on progressing in our application process!</p><p> Your OTP for further steps is ${otp} </p><p>Thank you,<br>CSG Team</p>`,
    };
    await transporter.sendMail(mailOptions);
    return otp
}
module.exports = {sendOTP};