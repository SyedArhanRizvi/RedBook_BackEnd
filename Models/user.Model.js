import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 500,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "BookUser",
      required: true,
    },
  },
  { timestamps: true }
);

export const ReviewModel = mongoose.model("UserReviews", reviewSchema);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    userProfileImg: {
      type: String,
      default : ""
    },
    userDescription : {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 40,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      unique: true
    },
    phone: {
      type: String,
      minlength: 8,
      maxlength: 15,
      required: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{7,14}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid international phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    // Admin Sector ::
    admin: {
      type: Boolean,
      default: false,
    },
    postedBooks: [
      {
        type: mongoose.Types.ObjectId,
        ref: "RedBook",
      },
    ],
    authorType: {
      type: String,
      default:""
    },
    
    followers: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookUser",
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "BookUser",
      },
    ],
    wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "RedBook"
    },
  ],
    cart: [
      {
      type: mongoose.Types.ObjectId,
      ref: "RedBook"
      },
    ],
    authorType: {
      type: String
    },
    otp : {
      type: Number
    },
    wishlist : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref : "BookModel"
      }
    ],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("BookUser", userSchema);
