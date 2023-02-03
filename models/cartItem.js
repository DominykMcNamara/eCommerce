const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartItemModel {
  constructor(data = {}) {
    this.cart_id = data.cart_id
    this.product_id = data.product_id
    this.quantity = data.quantity || 1
  }
  async getAll() {
    try {
      const command = "SELECT * FROM cart_items";
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
        pgp.helpers.insert(data, null, "cart_items") + "RETURNING *";
      const results = await db.query(command);
      if (results?.rows.length) {
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
      const findCartItems = pgp.format("WHERE id = ${id} RETURNING *", { id });
      const command =
        pgp.helpers.update(params, null, "cart_items") + findCartItems;
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findByCartId(id) {
    try {
      const command =
        "SELECT cart_items.id, cart_items.quantity, products.* FROM cart_items INNER JOIN products ON products.id = cart_items.product_id WHERE cart_items.cart_id = $1";
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

  async deleteById(id) {
    try {
      const command = "DELETE FROM cart_items WHERE id = $1 RETURNING *";
      const value = [id];
      const results = db.query(command, value);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
