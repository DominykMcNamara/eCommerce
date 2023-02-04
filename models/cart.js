const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class CartModel {
  constructor(data = {}) {
    this.is_active = true
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

  async create(user_id) {
    
    try {
      const data = { user_id, ...this}
      const command = pgp.helpers.insert(data, null, "carts") + "RETURNING *";
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(data) {
    const { id, ...params } = data;
    try {
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

  async findOneByUserId(id) {
    try {
      const command = "SELECT * FROM carts WHERE user_id = $1";
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
      const command = "DELETE FROM carts WHERE user_id = $1 RETURNING *";
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
};
