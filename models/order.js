const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
const OrderItem = require('./orderItem')

module.exports = class OrderModel {
  constructor(data = {}) {
    this.total = data.total || 0
    this.status = data.status || 'Unpaid'
    this.items = data.items || []
    this.user_id = data.user_id
  }

  async addOrderItems(items) {
    this.items = items.map(item => new OrderItem(item))
  }

  async findAll() {
    try {
      const command = "SELECT * FROM orders";
      const results = db.query(command);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneById(id) {
    try {
      const command = "SELECT * FROM orders WHERE id = $1";
      const value = [id];
      const results = await db.query(command, value);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findManyByUserId(id) {
    try {
      const command = "SELECT * FROM orders WHERE user_id = $1";
      const value = [id];
      const results = await db.query(command, value);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(data) {
    try {
      const command =
        pgp.helpers.insert(data, null, "orders") + "RETURNING *";
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(data) {
    const { id, ...params } = data;
    try {
      const findOrder = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const command = pgp.helpers.update(params, null, "orders") + findOrder;
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteOneById(id) {
    try {
      const command = "DELETE FROM orders WHERE id = $1 returning *";
      const values = [id];
      const results = await db.query(command, values);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
