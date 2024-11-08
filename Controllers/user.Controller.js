import { UserModel } from "../Models/user.Model.js";
import tokenGenerator from "../Utils/auth_Token.js";
import passwordHashController from "../Utils/hashed.Password.js";
import bcrypt from "bcrypt";
import generateOtp from "../Utils/otp.Generator.js";
import sendOtpEmail from "../Utils/nodemailer.js";
import cloudinaryUpload from "../Utils/cloudinary.upload.js";

export const newAccountController = async (req, res) => {
  let { fullName, username, email, phone, password } = req.body;
  try {
    const hashedPassword = await passwordHashController(password);
    password = hashedPassword;
    const createdUser = await UserModel.create({fullName,username,email,phone,password});
    return res.status(201).json({ message: "User Created Successfully ", createdUser });
  } catch (error) {
    console.log("There is some issus in your newAccountController plz fix the bug first =>", error);
    res.status(500).json({message:"There is some issus in your newAccountController plz fix the bug first =>",error});
  }
};
export const createAdminAccountController = async (req, res) => {
  const { email, password, authorType } = req.body;
  try {
    // Check if the user exists
    const isUserValid = await UserModel.findOne({ email });
    if (!isUserValid) {
      console.log("Invalid Email ", isUserValid);
      return res.status(401).json({ message: "Invalid Email", isUserValid });
    }
    // Validate the password
    const isPasswordValid = await bcrypt.compare(
      password,
      isUserValid.password
    );
    if (!isPasswordValid) {
      console.log("Invalid Password ", isPasswordValid);
      return res.status(401).json({ message: "Invalid Password", isPasswordValid });
    }
    // Update the user's authorType to true ::
    const createdAdminAc = await UserModel.findByIdAndUpdate(isUserValid._id, {authorType, admin:true}, {new:true});
    return res.status(201).json({message: "Admin account updated successfully", user:createdAdminAc});
  } catch (error) {
    console.log("There is some issue in your createAdminAccountController, please fix the bug first =>",error);
    res.status(500).json({message: "There is some issue in your createAdminAccountController", error});
  }
};

export const loginAccountController = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user exists
    const isUserValid = await UserModel.findOne({ email });
    if (!isUserValid) {
      console.log("Invalid Email ", isUserValid);
      return res.status(401).json({ message: "Invalid Email", isUserValid });
    }
    // Validate the password
    const isPasswordValid = await bcrypt.compare(password,isUserValid.password);
    if (!isPasswordValid) {
      console.log("Invalid Password ", isPasswordValid);
      return res.status(401).json({ message: "Invalid Password", isPasswordValid });
    }
    const userToken = await tokenGenerator(isUserValid);
    console.log("Received User Token ", userToken);
    
    return res.status(200).cookie("auth_token", userToken, {maxAge:3600000}).json({message:"User Found Successfully ", user: isUserValid});
  } catch (error) {
    console.log("There is some issus in your loginAccountController plz fix the bug first =>", error);
    res.status(500).json({message:"There is some issus in your loginAccountController plz fix the bug first => ",error});
  }
};
export const userAuthenticationController = async (req, res) => {
  try {
    const loggedInUser = req.user;
    return res.status(200).json({message:"User Has Already A Token ", user:loggedInUser});
  } catch (error) {
    console.log("There is some errors in your userAuthenticationController plz fix the bug first ", error);
    return res.status(500).json({message:"There is some errors in your userAuthenticationController plz fix the bug first ", error});
  }
};

export const updateAccountHandler = async (req, res) => {
  //fullName, username, description, imageSrc, phone, email
  let {fullName, username, email, phone, description} = req.body;
  console.log("This is full body data ", req.body);

  
  const id = req.params.id;  
  console.log("This is updated user id ", id);
  const photoLink = req.file ? req.file.path : null;
try {
  const uploadedImgLink = photoLink ? await cloudinaryUpload(photoLink) : null;
  console.log("This is return cloduinary link ", uploadedImgLink);
  

  const updatedUser = await UserModel.findByIdAndUpdate(id, {fullName, username, email, phone, userDescription:description, userProfileImg:uploadedImgLink ? uploadedImgLink.url : null}, {new:true});
  return res.status(201).json({message:"User Info Updated Successfully ", updatedUser});
} catch (error) {
  console.log("There is some issus in your updateAccountHandler plz fix the bug first =>", error);
  res.status(500).json({message:"There is some issus in your updateAccountHandler plz fix the bug first =>", error});
}
};
export const passwordUpdateController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await UserModel.findOne({email});
    if(!user) {
      console.log("Invalid Email ", user);
      return res.status(401).json({message:"Invalid Email ", user});
    }
    const userOtp = await generateOtp();
    console.log("This is OTP received from OTP Generator Function ", userOtp);
    if(!userOtp) {
      console.log("There is some issus in your userOtp generator plz fix the bug first ", userOtp);
      return res.status(401).json({message:"There is some issus in your userOtp generator plz fix the bug first ", userOtp});
    }
    user.otp = userOtp;
    user.save();
    const sendMail = await sendOtpEmail(email, userOtp);
    if(user.otp === otp) {
      console.log("Your otp has matched successfully");
      return res.status(200).json({message:"Your otp has matched successfully", user});
    }
  } catch (error) {
    console.log("There is some issus in your passwordUpdateController plz fix the bug first =>", error);
    res.status(500).json({message:"There is some issus in your passwordUpdateController plz fix the bug first =>", error});
  }
};
export const changePasswordSection2 = async (req, res)=>{
  let {password} = req.body;
  const id = req.params.id;
  console.log("This is user id ", id);
  try {
    const hashedPassword = await passwordHashController(password);
    password = hashedPassword;
    const user = await UserModel.findByIdAndUpdate(id, {password});
    return res.status(201).json({message:"Your Password has changed successfully", user});
  } catch (error) {
    console.log("There is some errors in your change password section2 plz fix the bug first ", error);
    return res.status(500).json({message:"There is some errors in your change password section2 plz fix the bug first ", error});
  }
}
export const deleteUserAccountController = async (req, res) => {
  const {email, password} = req.body;
  console.log("This is delete user req ", req);
  
  try {
    const user = await UserModel.findOne({email});
    if(!user) {
      console.log("Invalid Email ", user);
      return res.status(401).json({message:"Invalid Email ", user});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      console.log("Invalid Password ", user);
      return res.status(401).json({message:"Invalid Password ", user});
    }
    const deletedUserAccount = await UserModel.deleteOne({email});
    return res.status(201).clearCookie("auth_token").json({message:"User Account has successfully deleted"});
  } catch (error) {console.log("There is some issus in your deleteUserAccountController plz fix the bug first =>", error);
    res.status(500).json({message:"There is some issus in your deleteUserAccountController plz fix the bug first =>", error});
  }
};
export const userLoggedOutController = async (req, res) => {
  const id = req.params.id;
  console.log("User Logout id ", id);
  
try {
  const user = await UserModel.findById(id);
  if (!user) {
    console.log("User Not Found. Please check once in userLoggedOutController", id);
    return res.status(404).json({ message: "User Not Found. Please check the ID.", id });
  }
  res.clearCookie("auth_token");
  return res.status(200).json({ message: "User logged out successfully" });
} catch (error) {
  console.error("Error in userLoggedOutController:", error);
  return res.status(500).json({ message: "Internal Server Error", error: error.message });
}
};
export const userInfoController = async (req, res) => {
  const id = req.params.id;
  console.log("this is publisher user id ", id);
  
  try {
    const user = await UserModel.findById(id);
    if(!user) {
      console.log("Sorry user not found ", user, "This is provided user id ", id);
      return res.status(404).json({message:"Sorry user not found "});
    }
    return res.status(200).json({message:"This is user details ", user});
  } catch (error) {
    console.log("There is some errors so we can not provide you user info plz fix the bug first ", error);
    return res.status(500).json({message:"There is some errors so we can not provide you user info plz fix the bug first ", error});
  }
};
export const removeAdminAccountController = async (req, res)=>{
  const id = req.params.id;
  try {
    const removedAdmin = await UserModel.findByIdAndUpdate(id, {admin:false}, {new:true});
    return res.status(201).json({message:"Admin Removed Successfully", removedAdmin});
  } catch (error) {
    console.log("There are some errors in your remove admin account controller plz fix the bug first ", error);
    return res.status(500).json({message:"There are some errors in your remove admin account controller plz fix the bug first ", error});
  }
} 