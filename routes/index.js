const express = require("express");
const router = express.Router();

// Require controller modules
const product_instance_controller = require("../controllers/productInstanceController");
const product_controller = require("../controllers/productController");
const game_controller = require("../controllers/gameController");
const developer_controller = require("../controllers/developerController");
const genre_controller = require("../controllers/genreController");
const platform_controller = require("../controllers/platformController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/instancias");
});

/// INSTANCES ROUTES ///

// GET instances (inventory home page)
router.get("/instancias", product_instance_controller.all_instances);

// GET instance by id
router.get("/instancia/:id", product_instance_controller.instance_details);

/// PRODUCTS ROUTES ///

// GET products
router.get("/produtos", product_controller.all_products);

/// GAMES ROUTES ///

// GET games
router.get("/jogos", game_controller.all_games);

/// DEVELOPERS ROUTES ///

// GET developers
router.get("/desenvolvedores", developer_controller.all_developers);

/// GENRES ROUTES ///

// GET genres
router.get("/generos", genre_controller.all_genres);

/// PLATFORMS ROUTES ///

// GET platforms
router.get("/plataformas", platform_controller.all_platforms);

module.exports = router;
