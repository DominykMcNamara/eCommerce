const db = require("../db/index");

const checkIfProductExists = async (req, res, next) => {
    try {
      db.query(
        'SELECT * FROM "User" WHERE id = $1',
        [req.params.id],
        (err, rows) => {
          if (rows.rows.length === 0) {
            return res
              .status(404)
              .json({ message: `Product ${req.params.id} cannot be found` });
          } else {
            next();
          }
        }
      );
    } catch (err) {
      return res.status(404).json({ message: err.message });
    }
  };
  
  module.exports = checkIfProductExists;
  