const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductsController");
const ProductsControllerInstance = new ProductController();

module.exports = (app) => {
  app.use("/products", router);

  router.get("/", async (req, res, next) => {
    try {
      const response = await ProductsControllerInstance.getAll();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await ProductsControllerInstance.getOneById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data  = req.body;
      const response = await ProductsControllerInstance.updateOne({
        id: id,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await ProductsControllerInstance.deleteOne({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body
      const response = await ProductsControllerInstance.createProduct(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
