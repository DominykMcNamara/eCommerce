const express = require("express");
const router = express.Router();
const checkAuthenticated = require("../middleware/isAuthenticated");
const OrderService = require("../services/OrderService");
const OrderServiceInstance = new OrderService();

module.exports = (app) => {
  app.use("/orders", [checkAuthenticated], router);

  router.get("/myOrders", async (req, res, next) => {
    try {
      const response = await OrderServiceInstance.getManyByUserId({ id: req.user.id});
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = OrderServiceInstance.getOneById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const  data  = req.body;
      const response = await OrderServiceInstance.update({ id: id, status: data.status });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await OrderServiceInstance.deleteOne({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const  data  = req.body;
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
};
