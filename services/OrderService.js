const createError = require("http-errors");
const OrderModel = require("../models/order");
const OrderModelInstance = new OrderModel();
const OrderItemModel = require("../models/orderItem");
const OrderItemModelInstance = new OrderItemModel();
module.exports = class OrderService {
  async getAll() {
    try {
      orders = await OrderModelInstance.findAll();
      if (!orders) {
        throw createError(404, "No orders exist.");
      }
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async getOrder(data) {
    const { user_id } = data;

    try {
      const order = await OrderModelInstance.findOneByUserId(user_id);
      const items = await OrderItemModelInstance.findOneByOrderId(order.id);
      order.items = items;
      if (!order) {
        throw createError(404, "User does not exist");
      }
      return order;
    } catch (err) {
      throw err;
    }
  }

  async updateOrderItem(id, data) {
    try {
      const updatedOrder = await OrderModelInstance.update(id, data);
      if (!updatedOrder) {
        throw createError(404, "Order does not exist.");
      }
      return updatedOrder;
    } catch (err) {
      throw err;
    }
  }

  async deleteUserOrder(data) {
    try {
      const { user_id } = data;
      const order = await OrderModelInstance.deleteByUserId(user_id);
      if (!order) {
        throw createError(404, "Order does not exist.");
      }
      return order;
    } catch (err) {
      throw err;
    }
  }

  async createOrder(data) {
    const { user_id } = data
    try {
      const orderExists = await OrderModelInstance.findOneByUserId(user_id)
      if (orderExists) {
        throw createError(409, "User order exists");
      }
      return await OrderModelInstance.create(data);
    } catch (err) {
      throw err;
    }
  }

  async createOrderItem(user_id, data) {
    try {
      const order = await OrderModelInstance.findOneByUserId(user_id)
      console.log(order)
      const orderItem = await OrderItemModelInstance.create({
        order_id: order.id,
        ...data
      })
      return orderItem
    } catch (err) {
      throw err
    }
  }
};
