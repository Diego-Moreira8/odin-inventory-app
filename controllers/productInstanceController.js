const asyncHandler = require("express-async-handler");

const ProductInstance = require("../models/ProductInstance");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");
const Product = require("../models/Product");

exports.all_instances = asyncHandler(async (req, res, next) => {
  const allInstances = await ProductInstance.find()
    .populate({
      path: "product",
      populate: [
        {
          path: "game",
          populate: [{ path: "developer" }, { path: "genre" }],
        },
        {
          path: "platform",
        },
      ],
    })
    .exec();

  res.render("instances", {
    allInstances: allInstances,
  });
});

exports.instance_details = asyncHandler(async (req, res, next) => {
  const instance = await ProductInstance.findById(req.params.id)
    .populate({
      path: "product",
      populate: [{ path: "game" }, { path: "platform" }],
    })
    .exec();

  res.render("instanceDetails", { instance: instance });
});

exports.create_get = asyncHandler(async (req, res, next) => {
  const allProducts = await Product.find()
    .populate([
      {
        path: "game",
        populate: [{ path: "developer" }],
      },
      {
        path: "platform",
      },
    ])
    .exec();

  // Sort by platform, developer and title
  allProducts.sort((a, b) => {
    if (a.platform.name < b.platform.name) return -1;
    if (a.platform.name > b.platform.name) return 1;

    if (a.game.developer.name < b.game.developer.name) return -1;
    if (a.game.developer.name > b.game.developer.name) return 1;

    if (a.game.title < b.game.title) return -1;
    if (a.game.title > b.game.title) return 1;

    return 0;
  });

  res.render("createInstance", {
    errors: null,
    isAvailable: true,
    allProducts: allProducts,
    selectedProduct: "",
  });
});
