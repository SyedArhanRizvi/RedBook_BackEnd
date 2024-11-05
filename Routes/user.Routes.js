import express from "express";
import { changePasswordSection2, createAdminAccountController, deleteUserAccountController, loginAccountController, newAccountController, passwordUpdateController, removeAdminAccountController, updateAccountHandler, userAuthenticationController, userInfoController, userLoggedOutController } from "../Controllers/user.Controller.js";
import { upload } from "../Middlewares/multer.Midd.js";
import userAuthChecker from "../Middlewares/user.Auth.js";

const userRoutes = express.Router();

// For User Account Creation ::
userRoutes.post("/createUserAccount", newAccountController);

// For Admin Account Creation ::
userRoutes.put("/createAdminAccount", createAdminAccountController);

// For Login or Authentication ::
userRoutes.post("/loginAccount", loginAccountController);
userRoutes.post("/userAuthChecker", userAuthChecker, userAuthenticationController);

// For User Account Update or Password Change ::
userRoutes.put("/updateAccount/:id", upload.single('userProfileImg'), updateAccountHandler);
userRoutes.put("/updatePasswordSec1", passwordUpdateController);
userRoutes.put("/updatePasswordSec2", changePasswordSection2);

// For LoggedOut or Delete Account ::
userRoutes.post("/deleteUserAccount", deleteUserAccountController);
userRoutes.post("/loggedOutAccount/:id", userLoggedOutController);
userRoutes.put("/removeAdminAccount:id", removeAdminAccountController);

// For Show The User Information ::
userRoutes.get("/showUserDetails/:id", userInfoController);

export default userRoutes;