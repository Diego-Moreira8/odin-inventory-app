const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

exports.create_post = [
  body("game", "Um dos jogos precisa ser selecionado.")
    .isLength({ min: 1 })
    .escape(),
  body("platform", "Uma das plataformas precisa ser selecionada.")
    .isLength({ min: 1 })
    .escape(),
  body("launchDate", "Data inválida.").isISO8601().toDate(),
  body("currentPrice", "Preço inválido.")
    .isFloat({ min: 0, max: 1000000 })
    .withMessage("O preço deve ser um número entre 0 e 1.000.000.")
    .toFloat(),

  asyncHandler(async (req, res, next) => {
    const [allGames, allPlatforms] = await Promise.all([
      await Game.find().exec(),
      await Platform.find().exec(),
    ]);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("createProduct", {
        errors: errors.array(),
        allGames: allGames,
        allPlatforms: allPlatforms,
        selectedGame: req.body.game,
        selectedPlatform: req.body.platform,
        launchDate: req.body.launchDate.toISOString().split("T")[0],
        currentPrice: req.body.currentPrice,
      });
    } else {
      // Platform must not have duplicated games
      const gameExists = await Product.findOne({
        game: req.body.game,
        platform: req.body.platform,
      });

      if (gameExists) {
        res.render("createProduct", {
          errors: [
            ...errors.array(),
            { msg: "Este jogo já está cadastrado nesta plataforma." },
          ],
          allGames: allGames,
          allPlatforms: allPlatforms,
          selectedGame: req.body.game,
          selectedPlatform: req.body.platform,
          launchDate: req.body.launchDate.toISOString().split("T")[0],
          currentPrice: req.body.currentPrice,
        });
      } else {
        const newProduct = new Product({
          game: req.body.game,
          platform: req.body.platform,
          launchDate: req.body.launchDate,
          currentPrice: req.body.currentPrice,
        });

        await newProduct.save();
        res.redirect(newProduct.url);
      }
    }
  }),
];
