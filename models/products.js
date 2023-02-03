const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class ProductModel {
  constructor(data = {}) {
    this.name = data.name
    this.price = data.price
    this.description = data.description
    this.image = data.image
  }
  async create(data) {
    try {
      const command =
        pgp.helpers.insert(data, null, "products") + "RETURNING *";
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
    try {
      const { id, ...params } = data;
      const findProduct = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const command =
        pgp.helpers.update(params, null, "products") + findProduct;
        const results = await db.query(command)
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
      const command = "SELECT * FROM products WHERE id = $1";
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

  async findAll() {
    try {
      const command = "SELECT * FROM products";
      const results = await db.query(command);
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
      const command = "DELETE FROM products WHERE id = $1";
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
