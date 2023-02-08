const express = require("express");
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated')
const UserController = require("../controllers/UserController");
const UserControllerInstance = new UserController();

module.exports = (app) => {
  app.use("/user", [isAuthenticated], router);

  router.get("/", async (req, res, next) => {
    try {
      const response = await UserControllerInstance.getAll();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await UserControllerInstance.getOneById({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.patch("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const  data  = req.body;
      console.log(data)
      const response = await UserControllerInstance.updateOne({ id: id, ...data});
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await UserControllerInstance.deleteOne({ id: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
