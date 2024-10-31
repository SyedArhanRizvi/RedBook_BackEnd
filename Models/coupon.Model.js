import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
    default: 'fixed'
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  minimumOrderValue: {
    type: Number,
    default: 0  // Minimum order value for coupon applicability
  },
  expirationDate: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: 1  // Max times a coupon can be used globally
  },
  usedCount: {
    type: Number,
    default: 0  // Keeps track of times the coupon has been used
  },
  isActive: {
    type: Boolean,
    default: true  // Controls if the coupon is active
  },
  applicableCategories: {
    type: [String], // Limits the coupon to specific book categories
    default: []  // Empty array means it’s applicable to all categories
  },
  applicableBooks: {
    type: [mongoose.Schema.Types.ObjectId], // Limits the coupon to specific books
    ref: 'BookModel',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const CouponModel = mongoose.model("Coupon", couponSchema);
