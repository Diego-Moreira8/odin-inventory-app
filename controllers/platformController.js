const asyncHandler = require("express-async-handler");

const Platform = require("../models/Platform");
const Product = require("../models/Product");

exports.all_platforms = asyncHandler(async (req, res, next) => {
  const allPlatforms = await Platform.find().exec();

  res.render("platforms", { allPlatforms: allPlatforms });
});

exports.platform_page = asyncHandler(async (req, res, next) => {
  const [platform, allProducts] = await Promise.all([
    await Platform.findById(req.params.id).exec(),
    await Product.find({ platform: req.params.id }).populate("game").exec(),
  ]);

  res.render("platformPage", { platform: platform, allProducts: allProducts });
});
