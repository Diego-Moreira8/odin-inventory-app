const asyncHandler = require("express-async-handler");

const Platform = require("../models/Platform");

exports.all_platforms = asyncHandler(async (req, res, next) => {
  const allPlatforms = await Platform.find().exec();

  res.render("platforms", { allPlatforms: allPlatforms });
});
