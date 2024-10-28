import bcrypt, { hash } from "bcrypt";

const passwordHashController = async (password)=>{
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
       console.log("There is some errors in your password hash controller plz fix the bug first =>", error); 
    }
}
export default passwordHashController;