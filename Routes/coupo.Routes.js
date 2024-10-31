import express from "express";
import userAuthChecker from "../Middlewares/user.Auth";
import { couponCreateController, couponDeleteController, getAllBooksCouponsController, reActivateCouponController } from "../Controllers/coupon.Controller";

const couponsRoutes = express.Router();

couponsRoutes.post("/createCoupon", userAuthChecker, couponCreateController);
couponsRoutes.put("/reActivateCoupon:CID", userAuthChecker, reActivateCouponController);
couponsRoutes.get("/getAllCoupons", getAllBooksCouponsController);
couponsRoutes.delete("/deleteCoupon:CID", userAuthChecker, couponDeleteController);

export default couponsRoutes;