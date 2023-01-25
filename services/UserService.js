const createError = require("http-errors");
const UserModel = require("../models/user");
const UserModelInstance = new UserModel();

module.exports = class UserService {
  async getAll() {
    try {
      const users = await UserModelInstance.findAll();
      if (!users) {
        throw createError(404, "No users exist.");
      }
      return users;
    } catch (err) {
      throw err;
    }
  }

  async getOneById(data) {
    const { id } = data
    try {
      const user = await UserModelInstance.findOneById(id);
      if (!user) {
        throw createError(404, "User does not exist.");
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  async updateOne(data) {
    try {
      const updatedUser = await UserModelInstance.update(data);
      return updatedUser;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(data) {
    const { id } = data
    try {
      const userToDelete = await UserModelInstance.deleteUserById(id);
      return userToDelete;
    } catch (err) {
      throw err;
    }
  }
};
