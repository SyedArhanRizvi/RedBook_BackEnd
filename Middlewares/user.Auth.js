import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userAuthChecker = async (req, res, next)=>{
    const {auth_token} = req.Cookies;
    try {
        const decode_token = await jwt.verify(auth_token, process.env.JWT_SECRET);
        console.log("This is decoded_token ", decode_token);
        if(!decode_token) {
            console.log("Sorry decoded_token not found ", decode_token);
            return res.status(404).json({message:"Sorry decoded_token not found ", decode_token});
        }
        const userLoggedIn = await UserModel.findById(decode_token.userID);
        if(!userLoggedIn) {
            console.log("User Not Found ", userLoggedIn);
            return res.status(500).json({message:"User Not Found ", userLoggedIn});
        }
        req.user = userLoggedIn;
        next();
    } catch (error) {
        console.log("There is some errors in your user auth checker controller plz fix the bug first ", error);
    }
}
export default userAuthChecker;