const { Schema, default: mongoose } = require("mongoose");
const saleSchema = new Schema({
  quantity: {
    type: Schema.Types.Number,
    required: true,
  },
  date: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});
const product = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  productType: {
    type: Schema.Types.String,
    required: true,
  },
  grade: {
    type: Schema.Types.String,
    required: true,
  },
  purity: {
    type: Schema.Types.String,
    required: true,
  },
  unitsOfMeasure: {
    type: Schema.Types.String,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  moq: {
    type: Schema.Types.Number,
    required: true,
  },
  mrp: {
    type: Schema.Types.Number,
    required: true,
  },
  images: [
    {
      type: Schema.Types.String,
    },
  ],
  listing: {
    type: Schema.Types.String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  country: {
    type: Schema.Types.String,
    require: true,
  },
  seller: {
    type: Schema.ObjectId,
    ref: "seller",
  },
  sold: {
    type: Schema.Types.Number,
  },
  quantity: {
    type: Schema.Types.Number,
  },
  sales: [saleSchema],
  category: {
    type: Schema.Types.String,
  },
  // parentCategory: {
  //   type: Schema.Types.String,
  // },
});
const productModel =
  mongoose.models.product || mongoose.model("product", product);
module.exports = productModel;
