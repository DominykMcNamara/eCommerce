const createError = require("http-errors");
const OrderModel = require("../models/order");
const OrderModelInstance = new OrderModel()
module.exports = class OrderService {
  async getAll() {
    try {
      orders = await await OrderModelInstance.findAll();
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
      const order = await OrderModelInstance.findOneById(id);
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
      const orders = await OrderModelInstance.findManyByUserId(id);
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
      console.log(data)
      const updatedOrder = await OrderModelInstance.update(data);
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

      const order = await OrderModelInstance.deleteOneById(id);
      return order;
    } catch (err) {
      throw err;
    }
  }

  async createOrder(data) {
    try {
    
      const newOrder = OrderModelInstance.create(data)
      if (!newOrder) {
        throw createError(500, "Order could not be created.");
      }
      return newOrder;
    } catch (err) {
      throw err;
    }
  }
};
