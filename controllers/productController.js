const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");

exports.all_products = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .populate([{ path: "game" }, { path: "platform" }])
    .exec();

  res.render("products", { allProducts: allProducts });
});

exports.product_details = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
    .populate([
      { path: "game", populate: [{ path: "developer" }, { path: "genre" }] },
      { path: "platform" },
    ])
    .exec();

  res.render("productDetails", { product: product });
});
