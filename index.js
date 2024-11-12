import express from  "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.Routes.js";
import booksRoutes from "./Routes/book.Routes.js";
import couponsRoutes from "./Routes/coupons.Routes.js";
import cartRoutes from "./Routes/cart.Routes.js";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGODB_CONNECTION)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Your DB has successfully connected and hosted on this server ", process.env.PORT);   
})})
.catch((err)=>{
    console.log("There is some issus so we can't connect your DB and hosted on the server plz fix the bug first ", err);
});

app.use("/api/user", userRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/coupons", couponsRoutes);
app.use("/api/cart", cartRoutes);
