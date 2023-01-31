const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItem {
  async getAll() {
    try {
      const command = "SELECT * FROM order_items";
      const results = await db.query(command);
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
        pgp.helpers.insert(data, null, "order_items") + "RETURNING *";
      const results = await db.query(command);
      if (results?.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(data) {
    try {
      const { id, ...params } = data;
      const findOrderItems = pgp.format("WHERE id = ${ id } RETURNING *", {
        id,
      });
      const command =
        pgp.helpers.update(params, null, "order_items") + findOrderItems;
      const results = db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByOrderId(id) {
    try {
      const command = "SELECT order_items.id, order_items.quantity, products.* FROM order_items INNER JOIN products ON products.id = order_items.product_id WHERE order_items.order_id = $1";
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
      const command = "SELECT * FROM order_items WHERE user_id = $1";
      value = [id];
      const results = await db.query(command, value);
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
      const command = "DELETE FROM order_items WHERE id = $1";
      value = [id];
      const results = await db.query(command, value);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
