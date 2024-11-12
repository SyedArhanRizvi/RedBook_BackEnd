import express from "express";
import { addNewBookInDBController, bookDeleteController, bookInfoUpdateController, bookWishListController, getAllBooksController, getUserPostedBooks, showAuthorOrBook, showOneBookController, userReviewController } from "../Controllers/books.Controller.js";
import userAuthChecker from "../Middlewares/user.Auth.js";
// import multipleUpload from "../Middlewares/arrayMulter.js";
import singleUpload from "../Middlewares/arrayMulter.js";

const booksRoutes = express.Router();
// For Show All Books ::
booksRoutes.get("/getAllBooks", getAllBooksController);
booksRoutes.get("/readThisBook:id", showOneBookController);
booksRoutes.get("/getUserPostedBook:id", getUserPostedBooks);
booksRoutes.get("/searchAuthorOrBook", showAuthorOrBook);
/* This is for Admin Conf */

// Add New Book Controller ::
booksRoutes.post("/postNewBook:id", userAuthChecker, singleUpload, addNewBookInDBController);
booksRoutes.post("/addBookIntoWishList:bookID", userAuthChecker, bookWishListController);
booksRoutes.post("/addUserReview:productID", userAuthChecker, userReviewController);

// Update Previous Book ::
booksRoutes.put("/updateBookInfo:id", bookInfoUpdateController);

// Delete Book ::
booksRoutes.delete("/deleteBook:id", bookDeleteController);



export default booksRoutes;