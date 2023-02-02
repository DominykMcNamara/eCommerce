const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const AuthService = require("../services/AuthService");
const AuthServiceInstance = new AuthService();

module.exports = (app, passport) => {
  app.use("/auth", router);

  router.post("/register", async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const data = req.body;
      const response = await AuthServiceInstance.register(data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    "/login",
    passport.authenticate("local"),
    async (req, res, next) => {
      try {
        const { username, password } = req.body;
        const response = await AuthServiceInstance.login({
          email: username,
          password: password,
        });
        res.status(200).send(response);
      } catch (err) {
        next(err);
      }
    }
  );
  router.post("/logout", async (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).send("Logged out!");
    });
  });
};
