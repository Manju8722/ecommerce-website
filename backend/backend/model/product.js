const mongoose = require("mongoose");

const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
ProductSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("product", ProductSchema);
