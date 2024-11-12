import express from "express";
import userAuthChecker from "../Middlewares/user.Auth.js";
import { addBookIntoCartController, bookDecreaseQuantityController, bookIncreaseQuantityController, bookRemoveFromCartController, getAllCartProductsController } from "../Controllers/cart.Controller.js";

const cartRoutes = express.Router();

cartRoutes.post("/addBookIntoCart:BookID", userAuthChecker, addBookIntoCartController);
cartRoutes.put("/increaseBookQuantity:BookID", userAuthChecker, bookIncreaseQuantityController);
cartRoutes.put("/decreaseBookQuantity:BookID", userAuthChecker, bookDecreaseQuantityController);
cartRoutes.delete("/removeBookFromCart:BookID", userAuthChecker, bookRemoveFromCartController);
cartRoutes.get("/getAllCartProducts:id", getAllCartProductsController);

export default cartRoutes;