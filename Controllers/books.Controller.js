import mongoose from "mongoose";
import { BookModel } from "../Models/book.Model.js";
import { UserModel } from "../Models/user.Model.js";
// import cloudinaryUpload from "../Utils/cloudinary.upload.js";
// import uploadBookImages from "../Utils/cloudinary.upload.js";
import uploadSingleImage from "../Utils/cloudinary.upload.js";

// import Book from '../models/BookModel';  // Import your book model

export const addNewBookInDBController = async (req, res) => {
    const {bookName, bookTitle, author, description, categories, publicationDate, ISBN, price, availableCopies, isFree, pages} = req.body;
    const coverPhoto = req.file ? req.file.path : null;
    const id = req.params.id;
    console.log("This is cover photo get in controller  ", coverPhoto);
    try {
       const mainBookCover = await uploadSingleImage(coverPhoto);
       console.log("This is get img url from cloudinary ", mainBookCover);
       
        // Create or update your book entry in the Book model
        const validCategories = Array.isArray(categories)
        ? categories.map(category => 
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()
          )
        : [categories.charAt(0).toUpperCase() + categories.slice(1).toLowerCase()];
    
        // Parse `pages` to ensure it's an array of objects, if it's a string
        const parsedPages = typeof pages === "string" ? JSON.parse(pages) : pages;
    
        const newBook = await BookModel.create({
          publisher: req.params.id,
          bookName,
          bookTitle,
          author,
          description,
          categories: validCategories,
          publicationDate,
          ISBN,
          price,
          availableCopies,
          isFree,
          bookCoverImg:mainBookCover,
          pages: parsedPages,
        });
    
        res.status(201).json({
          message: "Book created successfully",
          book: newBook,
        });
      } catch (error) {
        console.log("Error during book creation: ", error);
        res.status(500).json({ message: "Error during book creation", error });
      }
    };

export const showOneBookController = async (req, res)=>{
  const id = req.params.id;
  console.log("This is received book id from front end ", id);
  
    try {
        const book = await BookModel.findById(id);
        return res.status(200).json({book});
    } catch (error) {
      console.log("There is some errors in your showOneBookController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your showOneBookController controller plz fix the bug first ", error});
    }
}
export const getAllBooksController = async (req, res)=>{
    let query = {};
    let sortArg = {};
    if(req.query.categories) {
      query.categories = req.query.categories;
    }
    if(req.query.author) {
      query.author = req.query.author;
    }
    if(req.query.isFree) {
      query.isFree = req.query.isFree;
    }
    if(req.query.price) {
     const sortingSymbols = {
        "=" : "$eq",
        ">" : "$gt",
        "<" : "$lt",
        ">=" : "$gte",
        "<=" : "$lte"
      };
      Object.keys(sortingSymbols).forEach((symbol)=>{
        if(req.query.price.startsWith(symbol)) {
          query.price = {
            [sortingSymbols[symbol]] : req.query.price.slice(symbol.length),
          }
        }
      });
    }
    if(req.query.sortBy && req.query.sort) {
      const sortBy = req.query.sortBy;
      const sort = req.query.sort.toLowerCase() == "asg" ? 1 : -1;
      sortArg[sortBy] = sort;
    }
    if(req.query.name) {
      query.name = {$regex : req.query.name, $options :'i'};
    }
    try {
        const allBooks = await BookModel.find(query).sort(sortArg);
        return res.status(200).json({allBooks});
    } catch (error) {
      console.log("There is some errors in your addNewBookInDBController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your addNewBookInDBController controller plz fix the bug first ", error});
    }
}
export const bookInfoUpdateController = async (req, res)=>{
  const id = req.params.id;
  const {bookName, bookTitle, author, description, categories, publicationDate, ISBN, price, availableCopies, isFree} = req.body;
    try {
      const book = await BookModel.findByIdAndUpdate(id, {bookName, bookTitle, author, description, categories, publicationDate, ISBN, price, availableCopies, isFree});
      return res.status(200).json({book});
    } catch (error) {
      console.log("There is some errors in your bookInfoUpdateController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your bookInfoUpdateController controller plz fix the bug first ", error});
    }
}
export const bookDeleteController = async (req, res)=>{
    const id = req.params.id;
    try {
        const deletedBook = await BookModel.findByIdAndDelete(id);
        return res.status(200).json({message:"Your Book has successfully delete"});
    } catch (error) {
      console.log("There is some errors in your bookDeleteController controller plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors in your bookDeleteController controller plz fix the bug first ", error});
    }
}
export const bookWishListController = async (req, res)=>{
  let bookID = req.params.bookID;
  const userID = req.user._id;
  bookID = new mongoose.Types.ObjectId(bookID);
  let addedWishList;
  try {
    const user = await UserModel.findById(userID);
    const existingBook = user.wishlist.find((ids)=> ids.equals(bookID));
    if(!existingBook) {
       addedWishList = await UserModel.findByIdAndUpdate(userID, 
        {
          $push : {wishlist : bookID}
        },
      {new : true}
    );
    return res.status(201).json({message:"Product Added Successfully into wish list ", addedWishList});
    } else {
       addedWishList = await UserModel.findByIdAndUpdate(userID, 
        {
          $pull : {wishlist : bookID}
        },
      {new : true}
    );
    return res.status(201).json({message:"Product Added Successfully into wish list ", addedWishList});
    }
  } catch (error) {
    console.log("There is some issus in your bookWishListController plz fix the bug first ", error);
    return res.status(500).json({message:"There is some issus in your bookWishListController plz fix the bug first ", error});
  }
}
export const userReviewController = async (req, res)=>{
  const {star, comment} = req.body;
  const BookID = req.params.productID;
  const userId = req.user._id;
  let rattedBook;
  try {
    // Find the book with the help of ID ::
    const findBook = await BookModel.findById(BookID);
    // Check if user has already ratted the book or not ??
    const alreadyRattedOrNot = findBook.ratings.find((review)=> review.postedBy.toString() === userId.toString());
    // If Exist so do some work otherwise to other works ::
    if(alreadyRattedOrNot) {
    rattedBook = await BookModel.findOneAndUpdate(
        {
          _id : BookID,
          "ratings.postedBy" : userId
        },
        {
          $set : {
            "ratings.comment" : comment,
            "ratings.star" : star
          }
        },
        {new : true}
      );
    } else {
    rattedBook = await BookModel.findByIdAndUpdate(BookID, {
        $push : {
          ratings : {
            postedBy: userId,
            comment : comment,
            star : star
          }
        }
      },
      {new:true}
    );
    }
    const totalRatting = rattedBook.ratings.length;
    const rattingSum = rattedBook.ratings.reduce((acc, curr) =>{
      return acc + curr.star;
    }, 0);
    const actualRatting = Math.round(totalRatting / rattingSum);
    const starRatting = await BookModel.findByIdAndUpdate(BookID, {totalStar:actualRatting});
    return res.status(201).json({message:"Your Review has been successfully added. ", review:rattedBook, stars:starRatting})
  } catch (error) {
    console.log("There is some errors in you user review controller plz fix the bug first ", error);
    return res.status(500).json({message:"There is some errors in you user review controller plz fix the bug first ", error});
  }
}