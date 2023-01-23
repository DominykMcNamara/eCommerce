const db = require("../db/index");

const checkIfUserExists = async (req, res, next) => {
  try {
    db.query(
      'SELECT * FROM users WHERE id = $1',
      [req.params.id],
      (err, rows) => {
        if (rows.rows.length === 0) {
          return res
            .status(404)
            .json({ message: `User ${req.params.id} cannot be found` });
        } else {
          next();
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = checkIfUserExists;
