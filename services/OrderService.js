const createError = require("http-errors");
const OrderModel = require("../models/order");
const OrderItemsModel = require("../models/orderItems");

module.exports = class OrderService {
  async getAll() {
    try {
      orders = await await OrderModel.findAll();
      if (!orders) {
        throw createError(404, "No orders exist.");
      }
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async getOneById(data) {
    const { id } = data;
    try {
      const order = await OrderModel.findOneById(id);
      if (!order) {
        throw createError(404, "Order does not exist.");
      }
      return order;
    } catch (err) {
      throw err;
    }
  }

  async getManyByUserId(data) {
    const { id } = data;
    try {
      const orders = await OrderModel.findManyByUserId(id);
      if (!orders) {
        throw createError(404, "User does not exist");
      }
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const updatedOrder = await OrderModel.update(data);
      if (!updatedOrder) {
        throw createError(404, "Order does not exist.");
      }
      return updatedOrder;
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(data) {
    try {
      const { id } = data;

      const order = await OrderModel.deleteOneById(id);
      if (!order) {
        throw createError(404, "Order does not exist.");
      }
      return order;
    } catch (err) {
      throw err;
    }
  }

  async createOrder(data) {
    try {
      const { userId, total, status } = data;
      const Order = new OrderModel();
      const newOrder = Order.create({
        user_id: userId,
        total: total,
        status: status,
      });
      if (!newOrder) {
        throw createError(500, "Order could not be created.");
      }
      return newOrder;
    } catch (err) {
      throw err;
    }
  }
};