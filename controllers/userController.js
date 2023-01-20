const db = require("../db/index");

const getAllUsers = async (req, res) => {
  try {
    db.query('SELECT username, email FROM "User"', (err, rows) => {
      if (err) {
        return res.status(404).json({ message: err.message });
      }
      if (rows) {
        return res.status(200).json({ users: rows.rows });
      }
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = { getAllUsers };
