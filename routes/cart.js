const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const CartController = require("../controllers/CartController");
const CartControllerInstance = new CartController();

module.exports = (app) => {
  app.use("/carts", [checkAuthenticated], router);

  router.get("/myCarts", async (req, res, next) => {
    try {
      const response = await CartControllerInstance.getCart({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/myCarts/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await CartControllerInstance.updateCartItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myCarts", async (req, res, next) => {
    try {
      const response = await CartControllerInstance.deleteUserCart({
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
      const response = await CartControllerInstance.deleteCartItem(
        req.user.id,
        parseInt(productId)
      );
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await CartControllerInstance.createCart({
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
      const response = await CartControllerInstance.createCartItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/myCarts/checkout", async (req, res, next) => {
    try {
      const { id } = req.user;
      const { cartId, paymentInfo } = req.body;
      const response = await CartControllerInstance.checkout(
        cartId,
        id,
        paymentInfo
      );
      res, status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
