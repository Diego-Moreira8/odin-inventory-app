const asyncHandler = require("express-async-handler");

const Product = require("../models/Product");
const Game = require("../models/Game");
const Platform = require("../models/Platform");

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

exports.create_get = asyncHandler(async (req, res, next) => {
  const [allGames, allPlatforms] = await Promise.all([
    await Game.find().exec(),
    await Platform.find().exec(),
  ]);

  res.render("createProduct", {
    errors: null,
    allGames: allGames,
    allPlatforms: allPlatforms,
    selectedGame: "",
    selectedPlatform: "",
    launchDate: new Date().toISOString().split("T")[0],
    currentPrice: "0",
  });
});
