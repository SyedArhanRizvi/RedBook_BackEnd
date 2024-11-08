import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookUser", // Reference to the user model
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Cancelled"],
        default: "Pending"
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { timestamps: true });

const bookSchema = new mongoose.Schema(
  {
    bookName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 100,
    },
    bookTitle: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 150,
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookUser", // Reference to the user model
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 4000,
    },
    categories: [
      {
        type: String,
        enum: [
          "Comedy",
          "History",
          "Adventure",
          "Romance",
          "Science Fiction",
          "Fantasy",
          "Mystery",
          "Thriller",
          "Horror",
          "Biography",
          "Self-Help",
          "Educational",
        ],
        required: true,
      },
    ],
    publicationDate: {
      type: Date,
    },
    ISBN: {
      type: String,
      unique: true,
      required: true,
    },
    totalStar: {
      type: Number,
    },
    ratings: [
      {
        postedBy : {
          type: mongoose.Schema.Types.ObjectId,
          ref : "user"
        },
        comment : {
          type : String
        },
        star : {
          type : Number,
          min: 0,
          max: 5,
          default: 0,
        }
      }
    ],
    bookCoverImg: {
      type: String,
    },
     
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    availableCopies: {
      type: Number,
      default: 1,
      min: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    pages: [
      {
        pageNumber: {
          type: Number,
          required: true,
        },
        content: {
          type: String,
          // required: true,
        }
      },
    ],
    samplePages: {
      type: Number,
      default: 5,
    },
    bookings: [bookingSchema],
    
  },
  { timestamps: true }
);
export const BookModel = mongoose.model("BookModel", bookSchema);