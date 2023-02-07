const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const OrderService = require("../services/OrderService");
const OrderServiceInstance = new OrderService();

module.exports = (app) => {
  app.use("/orders", [checkAuthenticated], router);

  router.get("/myOrders", async (req, res, next) => {
    try {
      const response = await OrderServiceInstance.getOrder({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/myOrder/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response = await OrderServiceInstance.updateOrderItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myOrders", async (req, res, next) => {
    try {
      const response = await OrderServiceInstance.deleteUserOrder({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body;
      const response = await OrderServiceInstance.createOrder({
        total: data.total,
        status: data.status,
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
      const response = await OrderServiceInstance.createOrderItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
