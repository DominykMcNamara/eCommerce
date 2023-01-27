const createError = require("http-errors");
const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();

module.exports = class CartService {
  async getAll() {
    try {
      const carts = await CartModelInstance.findAll();
      if (!carts) {
        throw createError(404, "No carts exist.");
      }
      return carts;
    } catch (err) {
      throw err;
    }
  }

  async getOneById(data) {
    const { id } = data;
    try {
      const cart = await CartModelInstance.findOneById(id);
      if (!cart) {
        throw createError(404, "Cart does not exist");
      }
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getManyByUserId(data) {
    const { id } = data;
    try {
      const carts = await CartModelInstance.findOneByUserId(id);
      if (!carts) {
        throw createError(404, "Cart does not exist.");
      }
      return carts;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const updatedCart = await CartModelInstance.update(data);
      if (!updatedCart) {
        throw createError(404, "Cart does not exis.");
      }
      return updatedCart;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(data) {
    try {
      const { id } = data;
      const cart = await CartModelInstance.deleteById(id);
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async createCart(data) {
    try {
      const newCart = CartModelInstance.create(data);
      if (!newOrder) {
        throw createError(500, "Order could not be created.");
      }
      return newCart;
    } catch (err) {
      throw err;
    }
  }
};
