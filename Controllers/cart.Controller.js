import { BookModel } from "../Models/book.Model.js";
import { CartModel } from "../Models/cart.Model.js";

export const addBookIntoCartController = async (req, res) => {
  const bookID = req.params.BookID;
  const userID = req.user._id;
  
  try {
    // Check if the user's cart already exists
    let cart = await CartModel.findOne({ user: userID }); // If no cart, create a new one for the user

    if (!cart) {
      cart = new CartModel({ user: userID, items: [] });
    } 
    // Find if the book is already in the cart

    const bookIndex = cart.items.findIndex(
      (item) => item.book.toString() === bookID
    );

    if (bookIndex > -1) {
      // If book is in the cart, increase the quantity
      cart.items[bookIndex].quantity += 1;
    } else {
      // If book is not in the cart, add it with quantity of 1
      cart.items.push({ book: bookID, quantity: 1 });
    } // Calculate the total price // Assuming BookModel has a price field

    const book = await BookModel.findById(bookID);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    } // Update the cart's total price

    cart.totalPrice += book.price; // Save the updated cart

    await cart.save();

    return res
      .status(200)
      .json({ message: "Book added to cart successfully", cart });
  } catch (error) {
    console.log(
      "Sorry there is some error in your addBookIntoCartController plz fix the bug first ",
      error
    );
    return res.status(500).json({
      message:
        "Sorry there is some error in your addBookIntoCartController plz fix the bug first ",
      error,
    });
  }
};

export const getAllCartProductsController = async (req, res)=>{
    const userID = req.params.id;
    console.log("We are in the get all cart product controller in here this user id ", userID);
    
    try {
        const cartProds = await CartModel.findOne({user:userID});
        return res.status(200).json({cartItems:cartProds});
    } catch (error) {
        console.log("There are some errors in your get all cart product controller plz fix the bug first ", error);
        return res.status(500).json({message:"There are some errors in your get all cart product controller plz fix the bug first ", error});
    }
}

export const bookIncreaseQuantityController = async (req, res) => {};
export const bookDecreaseQuantityController = async (req, res) => {};
export const bookRemoveFromCartController = async (req, res) => {};
