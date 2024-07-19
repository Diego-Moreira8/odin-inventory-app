const asyncHandler = require("express-async-handler");

const formatInstances = require("../public/utils/formatInstances");

const ProductInstance = require("../models/ProductInstance");
const Product = require("../models/Product");
const Game = require("../models/Game");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");

exports.index = asyncHandler(async (req, res, next) => {
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

  res.render("productInstancesTable", {
    allInstances: formatInstances(allInstances),
  });
});
