const ProductModel = require("../database/models/Product");

//Route to get all products
//GET=/api/products
exports.getAllproduct = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});

    res.send(products);
  } catch (err) {
    throwError(res, err);
  }
};

//Route for get Product by ID
//GET=/api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send(product);
  } catch (err) {
    throwError(res, err);
  }
};

//Route for add Product
//POST = /api/products
exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, description, quantity, category } = req.body;
    const product = new ProductModel();
    product.name = name;
    product.description = description;
    product.quantity = quantity;
    product.category = category;
    product.price = price;
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    throwError(res, err);
    console.log(err);
  }
};

//Route for edit Product by id
//PUT= /api/products/:id
exports.editProductById = async (req, res, next) => {
  try {
    const { name, price, description, quantity, category } = req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { name, price, description, quantity, category },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send(updatedProduct);
  } catch (err) {
    throwError(res, err);
  }
};

//Route for delete product by id
//DELETE= /api/products/:id
exports.deleteProductById = async (req, res, next) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndRemove(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.send({ message: "Delete Successful!" });
  } catch (err) {
    throwError(res, err);
  }
};
//Route for delete all product
//DELETE= /api/products
exports.deleteAllProducts = async (req, res, next) => {
  try {
    await ProductModel.deleteMany({});
    res.send({ message: "All products deleted successfully!" });
  } catch (err) {
    throwError(res, err);
  }
};

//Route for product find by name
//GET = api/products/search?name=[]
exports.findProductByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const products = await ProductModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.send(products);
  } catch (err) {
    throwError(res, err);
  }
};

//a function to throw errors
const throwError = (res, error) => {
  res.send({ error: error });
};
