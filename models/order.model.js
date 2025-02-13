const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        item: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    // Add other order fields
  },
  { timestamps: true }
);

module.exports = mongoose.model("EousOrders", orderSchema);
