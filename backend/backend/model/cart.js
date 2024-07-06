const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      index: true,
      ref: "auth",
      required: true,
    },
    totaPrice: {
      type: Number,
      default: 0,
    },
    productDetails: {
      type: [
        new Schema({
          productId: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: "product",
          },
          quantity: { type: Number },
          productPrice: { type: Number },
        }),
      ],
      default: [],
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("cart", CartSchema);
