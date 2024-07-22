const asyncHandler = require("express-async-handler");

const formatProducts = require("../public/utils/formatProducts");

const Product = require("../models/Product");

exports.all_products = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .populate([{ path: "game" }, { path: "platform" }])
    .exec();

  res.render("products", {
    allProducts: formatProducts(allProducts),
  });
});
