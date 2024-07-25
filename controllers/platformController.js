const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Platform = require("../models/Platform");
const Product = require("../models/Product");

const PLATFORM_CREATION_PAGE_PARAMS = {
  title: "Adicionar plataforma",
  label: "Nome da plataforma: *",
  placeholder: "X-Box One X",
  errors: null,
};

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

exports.create_get = asyncHandler(async (req, res, next) => {
  res.render("createSimpleObject", PLATFORM_CREATION_PAGE_PARAMS);
});

exports.create_post = [
  body("name", "Este campo não pode ficar vazio.").trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const newPlatform = new Platform({ name: req.body.name });

    if (!errors.isEmpty()) {
      res.render("createSimpleObject", {
        ...PLATFORM_CREATION_PAGE_PARAMS,
        errors: errors.array(),
      });
      return;
    } else {
      const platformExists = await Platform.findOne({
        name: req.body.name,
      }).exec();

      if (platformExists) {
        res.render("createSimpleObject", {
          ...PLATFORM_CREATION_PAGE_PARAMS,
          errors: [
            ...errors.array(),
            { msg: `A plataforma ${req.body.name} já existe.` },
          ],
        });
      } else {
        await newPlatform.save();
        res.redirect(newPlatform.url);
      }
    }
  }),
];
