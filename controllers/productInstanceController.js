const asyncHandler = require("express-async-handler");

const ProductInstance = require("../models/ProductInstance");
const Developer = require("../models/Developer");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");

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
