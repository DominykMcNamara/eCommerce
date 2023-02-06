const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const CartService = require("../services/CartService");
const CartServiceInstance = new CartService();

module.exports = (app) => {
  app.use("/carts", [checkAuthenticated], router);

  router.get("/myCarts", async (req, res, next) => {
    try {
      const response = await CartServiceInstance.getCart({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await CartServiceInstance.update({
        id: id,
        is_active: data.is_active,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myCarts", async (req, res, next) => {
    try {
      const response = await CartServiceInstance.deleteUserCart({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myCarts/:productId", async (req, res, next) => {
    const { productId } = req.params;
    try {
      const response = await CartServiceInstance.deleteCartItem( req.user.id, parseInt(productId));
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await CartServiceInstance.createCart({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/items", async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;
      const response = await CartServiceInstance.createCartItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
