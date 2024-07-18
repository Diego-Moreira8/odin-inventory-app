const asyncHandler = require("express-async-handler");

const ProductInstance = require("../models/ProductInstance");
const Product = require("../models/Product");
const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");

exports.index = asyncHandler(async (req, res, next) => {
  const allInstances = await ProductInstance.find().exec();

  res.render("productInstancesList", {
    allInstances: allInstances,
  });
});
