const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const OrdersController = require("../controllers/OrderController");
const OrdersControllerInstance = new OrdersController();

module.exports = (app) => {
  app.use("/orders", [checkAuthenticated], router);

  router.get("/myOrders", async (req, res, next) => {
    try {
      const response = await OrdersControllerInstance.getOrder({
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
      const response = await OrdersControllerInstance.updateOrderItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myOrders", async (req, res, next) => {
    try {
      const response = await OrdersControllerInstance.deleteUserOrder({
        user_id: req.user.id,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/myOrders/:productId", async (req, res, next) => {
    const { productId } = req.params;
    try {
      const response = await OrdersControllerInstance.deleteOrderItem(
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
      const response = await OrdersControllerInstance.createOrder({
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
      const response = await OrdersControllerInstance.createOrderItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
