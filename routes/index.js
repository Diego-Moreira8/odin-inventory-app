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

// GET instances (inventory home page)
router.get("/instancias", product_instance_controller.all_instances);

// GET products
router.get("/produtos", product_controller.all_products);

// GET games
router.get("/jogos", game_controller.all_games);

// GET developers
router.get("/desenvolvedores", developer_controller.all_developers);

// GET genres
router.get("/generos", genre_controller.all_genres);

// GET platforms
router.get("/plataformas", platform_controller.all_platforms);

module.exports = router;
