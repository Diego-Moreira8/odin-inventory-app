const asyncHandler = require("express-async-handler");

const formatProducts = require("../public/utils/formatProducts");

const ProductInstance = require("../models/ProductInstance");
const Product = require("../models/Product");
const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");

exports.all_products = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .populate([{ path: "game" }, { path: "platform" }])
    .exec();

  res.render("products", {
    allProducts: formatProducts(allProducts),
  });
});
