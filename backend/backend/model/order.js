const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "auth",
    },
    customerId: {
      type: String,
      index: true,
    },
    paymentIntentId: { type: String },
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          index: true,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
        productPrice: {
          type: Number,
        },
      },
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    deliveryStatus: { type: String, default: "pending" },
    payment_status: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("order", orderSchema);
