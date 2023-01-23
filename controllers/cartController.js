const db = require("../db/index");

const getAllUsersCarts = async (req, res) => {
  try {
    db.query(
      'SELECT * FROM "Carts" WHERE userId = $1',
      [req.user],
      (err, rows) => {
        if (!rows) {
          return res
            .status(200)
            .json({ message: `User ${req.user} has no active carts.` });
        }
        if (rows) {
          return res.status(200).json({ carts: rows.rows });
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = { getAllUsersCarts };
