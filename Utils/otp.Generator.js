import otpGenerator from "otp-generator";

const generateOtp = async ()=>{
    try {
       const generatedOtp = await otpGenerator.generate(6, {digits:true, lowerCaseAlphabets:false, upperCaseAlphabets: false, specialChars: false });
       return generatedOtp;
    } catch (error) {
        console.log("There is some errors in your otp generator function plz fix the bug first ", error);
    }
}
export default generateOtp;