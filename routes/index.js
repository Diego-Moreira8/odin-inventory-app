const express = require("express");
const router = express.Router();

// Require controller modules
const product_instance_controller = require("../controllers/productInstanceController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/instancias");
});

// GET instances (inventory home page)
router.get("/instancias", product_instance_controller.index);

module.exports = router;
