const db = require("../db/index");
const bcrypt = require("bcrypt");
const handleNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  if ((!username || !email, !password)) {
    return res
      .status(400)
      .json({ message: "Username, Email, and Password are required." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    db.query(
      'INSERT INTO "User"(username, password, email) VALUES($1, $2, $3)',
      [username, hashedPassword, email],
      (err, rows) => {
        if (err) {
          return res.status(404).json({ message: err.message });
        }
        if (rows) {
          return res.status(201).send(rows);
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
