const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });
const bcrypt = require("bcrypt");
module.exports = class UserModel {
  async create(data) {
    
    try {
      const newUser = {
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        password: await bcrypt.hash(data.password, 10),
        email: data.email
      }
      const command = pgp.helpers.insert(newUser, null, "users") + "RETURNING *";
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
      const findUser = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const command = pgp.helpers.update(params, null, "users") + findUser;
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows[0];
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByEmail(email) {
    try {
      const command = "SELECT * FROM users WHERE email = $1";
      const value = [email];
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
      const command = "SELECT * FROM users WHERE id = $1";
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
      const command = "SELECT * FROM users";
      const results = await db.query(command);
      if (results.rows?.length) {
        return results.rows;
      }
      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUserById(id) {
    try {
      const command = "DELETE FROM users WHERE id = $1";
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
