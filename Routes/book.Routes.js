import express from "express";

const booksRoutes = express.Router();

// For Show All Books ::
booksRoutes.get("/getAllBooks", getAllBooksController);
booksRoutes.get("/readThisBook:id", showOneBookController);

/* This is for Admin Conf */
// Add New Book Controller ::
booksRoutes.post("/postNewBook", addNewBookInDBController);

// Update Previous Book ::
booksRoutes.put("/updateBookInfo:id", bookInfoUpdateController);

// Delete Book ::
booksRoutes.delete("/deleteBook:id", bookDeleteController);



export default booksRoutes;