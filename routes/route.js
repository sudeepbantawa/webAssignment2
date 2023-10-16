const express = require("express");
const {
  getAllproduct,
  getProductById,
  addProduct,
  editProductById,
  deleteProductById,
  deleteAllProducts,
  findProductByName,
} = require("../controllers/ProductController");

const router = express.Router();

//assign controller to routes
router.get("/products/search", findProductByName);
router.get("/products", getAllproduct);
router.get("/products/:id", getProductById);
router.post("/products", addProduct);
router.put("/products/:id", editProductById);
router.delete("/products/:id", deleteProductById);
router.delete("/products", deleteAllProducts);
module.exports = router;
