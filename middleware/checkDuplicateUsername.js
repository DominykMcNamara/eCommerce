const db = require("../db/index");

const checkDuplicateUsernames = (req, res, next) => {
  if (!req.body.username) {
    return res.json({ message: "Username is required." });
  }
  console.log(req.body);
  try {
    db.query(
      'SELECT * FROM "User" WHERE username = $1',
      [req.body.username],
      (err, rows) => {
        if (err) {
          return res.json({ message: err.message });
        }
        if (rows.rows.length !== 0) {
          return res.status(409).json({ message: "Username already exists." });
        } else {
          next()
        }
      }
    );
  } catch (err) {
    return res.json({ message: err.message });
  }
  
};

module.exports = checkDuplicateUsernames;
