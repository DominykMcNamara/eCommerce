const createError = require("http-errors");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const CartModel = require("../models/cart");
const CartModelInstance = new CartModel();
const CartItemModel = require("../models/cartItem");
const CartItemModelInstance = new CartItemModel();
const OrderModel = require("../models/order");

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

  async getCart(data) {
    const { user_id } = data;
    try {
      const cart = await CartModelInstance.findOneByUserId(user_id);
      const items = await CartItemModelInstance.findByCartId(cart.id);
      cart.items = items;
      if (!cart) {
        throw createError(404, "Cart does not exist.");
      }
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async updateCartItem(id, data) {
    try {
      const updatedCartItem = await CartItemModelInstance.update(id, data);
      if (!updatedCartItem) {
        throw createError(404, "Item does not exist.");
      }
      return updatedCartItem;
    } catch (err) {
      throw err;
    }
  }



  async deleteUserCart(data) {
    try {
      const { user_id } = data;
      const cart = await CartModelInstance.deleteByUserId(user_id);
      if (!cart) {
        throw createError(404, "Cart does not exist.");
      }
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async createCart(data) {
    const { user_id } = data;
    try {
      const cartExists = await CartModelInstance.findOneByUserId(user_id);
      if (cartExists) {
        throw createError(409, "User cart exists");
      }
      return await CartModelInstance.create(user_id);
    } catch (err) {
      throw err;
    }
  }

  async createCartItem(user_id, data) {
    try {
      const cart = await CartModelInstance.findOneByUserId(user_id);
      const cartItem = await CartItemModelInstance.create({
        cart_id: cart.id,
        ...data,
      });
      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async deleteCartItem(data, product_id) {
    try {
      const cart = await CartModelInstance.findOneByUserId(data);
      const cartItem = await CartItemModelInstance.deleteCartItem(
        cart.id,
        product_id
      );
      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(data) {
    const { cartId, userId, payment } = data;
  }
};
