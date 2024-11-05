import { response } from "express";
import { CouponModel } from "../Models/coupon.Model.js";
import { UserModel } from "../Models/user.Model.js";

export const couponCreateController = async (req, res)=>{
    let {code, discountType, discountValue, expirationDay} = req.body;
    const expirationDate = new Date(Date.now() + expirationDay * 24 * 60 * 60 * 1000);
    const userID = req.user._id;
    try {
        const isUserValid = await UserModel.findById(userID);
        if(isUserValid.admin === false) {
            console.log("Sorry you can not create coupons because you are not an Admin");
            return res.status(400).json({message:"Sorry you can not create coupons because you are not an Admin"});
        }
        const isCouponExist = await CouponModel.findOne(code);
        if(isCouponExist) {
            console.log("Sorry you can not create coupons because this coupon code already exist plz try with different coupon code");
            return res.status(400).json({message:"Sorry you can not create coupons because this coupon code already exist plz try with different coupon code"});
        }
        const createdCoupon = await CouponModel.create({code, discountType, discountValue, expirationDate});
        return res.status(201).json({message:"Your Coupon has been successfully created ", createdCoupon});
    } catch (error) {
        console.log("There is some errors so we can not create your coupon plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors so we can not create your coupon plz fix the bug first ", error});
    }
}
export const getAllBooksCouponsController = async (req, res)=>{
    try {
        const findAllCoupons = await CouponModel.find().sort({createdAt:-1});
        return res.status(200).json({message:"Successfully received all coupons ", coupons:findAllCoupons});
    } catch (error) {
        console.log("There is some errors so we can not give you all coupons list ", error);
        return res.status(500).json({message:"There is some errors so we can not give you all coupons list ", error});      
    }
}
export const reActivateCouponController = async (req, res)=>{
    const {extendedDate} = req.body;
    const couponId = req.params.CID;
    const userID = req.user._id;
    const expirationDate = new Date(Date.now() + extendedDate * 24 * 60 * 60 * 1000);
    try {
        const isUserValid = await UserModel.findById(userID);
        if(isUserValid.admin === false) {
            console.log("Sorry you can not create coupons because you are not an Admin");
            return res.status(400).json({message:"Sorry you can not create coupons because you are not an Admin"});
        }
    const updatedCoupon = await CouponModel.findByIdAndUpdate(couponId, {expirationDate}, {new:true});
    return res.status(201).json({message:"Your Coupon has been successfully updated ", coupon:updatedCoupon});
    } catch (error) {
        console.log("There is some errors so we can not reActivate your coupon plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors so we can not create your coupon plz fix the bug first ", error});     
    }
}
export const couponDeleteController = async (req, res)=>{
         const couponId = req.params.CID;
         const userID = req.user._id;
    try {
        const isUserValid = await UserModel.findById(userID);
        if(isUserValid.admin === false) {
            console.log("Sorry you can not create coupons because you are not an Admin");
            return res.status(400).json({message:"Sorry you can not create coupons because you are not an Admin"});
        }
        const deletedCoupon = await CouponModel.findByIdAndDelete(couponId);
        return res.status(200).json({message:"Your coupon has been successfully deleted"});
    } catch (error) {
        console.log("There is some errors so we can not delete your coupon plz fix the bug first ", error);
        return res.status(500).json({message:"There is some errors so we can not delete your coupon plz fix the bug first ", error});   
    }
}