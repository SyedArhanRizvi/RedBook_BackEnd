import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const tokenGenerator = async (user)=>{
    try {
    const userToken = await jwt.sign(
            {
                userID : user._id,
                userMail : user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn : '1h'
            }
        );
        return userToken;
    } catch (error) {
        console.log("There is some issus in your token generator controller plz fix the bug first ", error);
    }
}
export default tokenGenerator;