const db = require("../db/index");
const bcrypt = require("bcrypt");
const handleNewUser = async (req, res) => {
  console.log(req.body)
  const { first_name, last_name, username, email, password } = req.body;
  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).json({
      message:
        "First Name, Last Name, Username, Email and Password are required.",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    db.query(
      'INSERT INTO userssddd(first_name, last_name, username, password, email) VALUES($1, $2, $3, $4, $5)',
      [first_name, last_name, username, hashedPassword, email],
      (err, rows) => {
        if (rows) {
          return res
            .status(201)
            .json({ message: `User with username ${username} created!` });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
