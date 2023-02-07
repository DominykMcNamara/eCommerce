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

  async findOneByUserId(id) {
    try {
      const command = "SELECT * FROM orders WHERE user_id = $1";
      const value = [id];
      const results = await db.query(command, value);
      console.log(results)
      if (results.rows?.length) {
        return results.rows[0];
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

  async deleteByUserId(id) {
    try {
      const command = "DELETE FROM orders WHERE user_id = $1 returning *";
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
