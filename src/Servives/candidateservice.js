const otpGenerator = require('otp-generator')
const generateOTP =()=>{
    const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets:false });
    return otp;
}
module.exports = {generateOTP};