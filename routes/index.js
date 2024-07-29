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

// GET product by id
router.get("/produto/:id", product_controller.product_details);

/// GAMES ROUTES ///

// GET games
router.get("/jogos", game_controller.all_games);

// GET game by id
router.get("/jogo/:id", game_controller.game_details);

/// DEVELOPERS ROUTES ///

// GET developers
router.get("/desenvolvedores", developer_controller.all_developers);

// GET developers genre
router.get("/desenvolvedor/criar", developer_controller.create_get);

// POST developers genre
router.post("/desenvolvedor/criar", developer_controller.create_post);

// GET developer by id
router.get("/desenvolvedor/:id", developer_controller.developer_page);

/// GENRES ROUTES ///

// GET genres
router.get("/generos", genre_controller.all_genres);

// GET create genre
router.get("/genero/criar", genre_controller.create_get);

// POST create genre
router.post("/genero/criar", genre_controller.create_post);

// GET genre by id
router.get("/genero/:id", genre_controller.genre_page);

/// PLATFORMS ROUTES ///

// GET platforms
router.get("/plataformas", platform_controller.all_platforms);

// GET create platform
router.get("/plataforma/criar", platform_controller.create_get);

// POST create platform
router.post("/plataforma/criar", platform_controller.create_post);

// GET platform by ID
router.get("/plataforma/:id", platform_controller.platform_page);

module.exports = router;
