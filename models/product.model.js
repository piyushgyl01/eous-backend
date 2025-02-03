const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImg: {
      type: String,
      required: true,
    },
    isWishlisted: {
      type: Boolean,
      default: false,
    },
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    isAddedToCart: {
      type: Boolean,
      default: false,
    },
    isBuyNow: {
      type: Boolean,
      default: false,
    },
    productRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    productQuantity: {
      type: Number,
      min: 0,
      max: 10,
      default: 1,
    },
    productPerks: [
      {
        perkName: { type: String, required: true },
        perkIcon: { type: String },
      },
    ],
    productDescription: [
      {
        title: { type: String, required: true },
        details: { type: String, required: true },
      },
    ],
    category: {
      type: String,
      enum: ["Premium", "Budget", "Ultra-Premium"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EousProducts", productSchema);
