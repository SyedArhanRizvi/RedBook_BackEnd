import express from "express";
import userAuthChecker from "../Middlewares/user.Auth";
import { addBookIntoCartController, bookDecreaseQuantityController, bookIncreaseQuantityController, bookRemoveFromCartController } from "../Controllers/cart.Controller";

const cartRoutes = express.Router();

cartRoutes.post("/addBookIntoCart:BookID", userAuthChecker, addBookIntoCartController);
cartRoutes.put("/increaseBookQuantity:BookID", userAuthChecker, bookIncreaseQuantityController);
cartRoutes.put("/decreaseBookQuantity:BookID", userAuthChecker, bookDecreaseQuantityController);
cartRoutes.delete("/removeBookFromCart:BookID", userAuthChecker, bookRemoveFromCartController);


export default cartRoutes;