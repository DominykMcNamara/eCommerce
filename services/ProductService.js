const createError = require("http-errors");
const ProductModel = require("../models/products");
const ProductModelInstance = new ProductModel();

module.exports = class ProductService {
  async getAll() {
    try {
      const products = await ProductModelInstance.findAll();
      if (!products) {
        throw createError(404, "No products exist");
      }
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getOneById(data) {
    const { id } = data;
    try {
      const product = await ProductModelInstance.findOneById(id);
      if (!product) {
        throw createError(404, "Product does not exist.");
      }
      return product;
    } catch (err) {
      throw err;
    }
  }

  async updateOne(data) {
    try {
      const updatedProduct = await ProductModelInstance.update(data);
      if (!updatedProduct) {
        throw createError(404, "Product does not exist.")
      }
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(data) {
    const { id } = data;
    try {
      const productToDelete = await ProductModelInstance.deleteById(id);
      return productToDelete;
    } catch (err) {
      throw err;
    }
  }

  async createProduct(data) {
    try {
      const newProduct = await ProductModelInstance.create(data);
      if (!newProduct) {
        throw createError(500, "Order could not be created.") 
     }
      return newProduct;
    } catch (err) {
      throw err;
    }
  }
};
