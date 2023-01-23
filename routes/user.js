const express = require("express");
const router = express.Router();
const UserService = require("../services/UserService");
const UserServiceInstance = new UserService();

module.exports = (app) => {
  app.use("/user", router);

  router.get("/", async (req, res, next) => {
    try {
      const response = await UserServiceInstance.getAll();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await UserServiceInstance.getOneById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const { data } = req.body;
      const response = await UserServiceInstance.updateOne({ id: id, ...data });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await UserServiceInstance.deleteOne({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
