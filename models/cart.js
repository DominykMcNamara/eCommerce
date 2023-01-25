const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
  constructor(data = {}) {
    this.isActive = data.isActive || true;
  }

  async findAll() {
    try {
      const command = "SELECT * FROM carts";
      const results = db.query(command);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async create(userId) {
    try {
      const data = { userId, ...this };
      const command = pgp.helpers.insert(data, null, "carts") + "RETURNING *";
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateCart(data) {
    try {
      const { id, ...params } = data;
      const findCart = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const command = pgp.helpers.update(params, null, "carts") + findCart;
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByUserId(userId) {
    try {
      const command = "SELECT * FROM carts WHERE user_id = $1";
      const value = [userId];
      const results = await db.query(command, value);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneById(id) {
    try {
      const command = "SELECT * FROM carts WHERE id = $1";
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

  async deleteById(id) {
    try {
      const command = "DELETE FROM carts WHERE id = $1";
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
