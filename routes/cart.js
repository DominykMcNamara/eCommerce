const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const CartService = require("../services/CartService");
const CartServiceInstance = new CartService();

module.exports = (app) => {
  app.use("/carts", [checkAuthenticated], router);

  router.get("/myCarts", async (req, res, next) => {
    try {
      const response = await CartServiceInstance.getManyByUserId({
        id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await CartServiceInstance.getOneById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await CartServiceInstance.update({ id: id, is_active: data.is_active });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = CartServiceInstance.deleteOne({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body;
      const response = CartServiceInstance.createCart({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
