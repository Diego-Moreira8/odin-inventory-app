const express = require("express");
const router = express.Router();

// Require controller modules
const product_instance_controller = require("../controllers/productInstanceController");

// GET inventory home page
router.get("/", product_instance_controller.index);

module.exports = router;
