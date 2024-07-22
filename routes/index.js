const express = require("express");
const router = express.Router();

// Require controller modules
const product_instance_controller = require("../controllers/productInstanceController");
const product_controller = require("../controllers/productController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/instancias");
});

// GET instances (inventory home page)
router.get("/instancias", product_instance_controller.all_instances);

// GET products
router.get("/produtos", product_controller.all_products);

module.exports = router;
