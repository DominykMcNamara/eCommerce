const db = require("../db/index");

const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username || !email, !password)) {
    return res
      .status(400)
      .json({ message: "Username, Email, and Password are required." });
  }
  try {
    const { newUser } = db.query(
      "INSERT INTO user (username, email, password) VALUES($1, $2, $3)",
      [username, hashedPassword, email],
      (err, rows) => {
        if (err) {
          return res.status(404).json({ message: err.message });
        }
        if (rows) {
          return res.status(201).json({ message: rows });
        }
      }
    );
  } catch (err) {
    res.sendStatus(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser }
