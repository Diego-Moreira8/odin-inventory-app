const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const ProductInstance = require("../models/ProductInstance");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");
const Product = require("../models/Product");
const InstanceCounter = require("../models/instanceCounter");

/** Get all products sorted by platform, developer and title */
async function getSortedProducts() {
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

  allProducts.sort((a, b) => {
    if (a.platform.name < b.platform.name) return -1;
    if (a.platform.name > b.platform.name) return 1;

    if (a.game.developer.name < b.game.developer.name) return -1;
    if (a.game.developer.name > b.game.developer.name) return 1;

    if (a.game.title < b.game.title) return -1;
    if (a.game.title > b.game.title) return 1;

    return 0;
  });

  return allProducts;
}

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
  const allProducts = await getSortedProducts();

  res.render("createInstance", {
    errors: null,
    isAvailable: true,
    allProducts: allProducts,
    selectedProduct: "",
  });
});

exports.create_post = [
  body("isAvailable", "Um status precisa ser escolhido.")
    .isLength({ min: 1 })
    .escape(),
  body("product", "Um produto precisa ser escolhido.")
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const allProducts = await getSortedProducts();
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("createInstance", {
        errors: errors.array(),
        isAvailable: req.body.isAvailable,
        allProducts: allProducts,
        selectedProduct: req.body.selectedProduct,
      });
    } else {
      let numberInStock;
      const instanceCounter = await InstanceCounter.findOne();

      if (instanceCounter) {
        numberInStock = instanceCounter.count;
      } else {
        const newCounter = new InstanceCounter();
        await newCounter.save();
        numberInStock = newCounter.count;
      }

      const newInstance = new ProductInstance({
        isAvailable: req.body.isAvailable === "Disponível",
        product: req.body.product,
        numberInStock: numberInStock,
      });

      await newInstance.save();
      await InstanceCounter.findOneAndUpdate({
        $inc: { count: 1 },
      });
      res.redirect(newInstance.url);
    }
  }),
];
