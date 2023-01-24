const createError = require("http-errors");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const UserModelInstance = new UserModel();

module.exports = class AuthService {
  async register(data) {
    try {
      const { email } = data;
      const user = await UserModelInstance.findOneByEmail(email);
      if (user) {
        throw createError(409, "Email already in use.");
      }
      return await UserModelInstance.create(data);
    } catch (err) {
      throw createError(500, err);
    }
  }

  async login(data) {
    try {
      const { email, password } = data;
      const user = await UserModelInstance.findOneByEmail(email);
      if (!user) {
        throw createError(401, "Incorrect Username or Password");
      }
      const pwd = bcrypt.compare(password, user.password);
      if (!pwd) {
        throw createError(501, "Incorrect Username or Password");
      }
      return user;
    } catch (err) {
      throw createError(100, err);
    }
  }
};
