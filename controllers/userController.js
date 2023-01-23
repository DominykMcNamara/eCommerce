const db = require("../db/index");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    db.query('SELECT first_name, last_name, username, email FROM users', (err, rows) => {
      if (rows.rows.length === 0) {
        return res
          .status(200)
          .json({ message: "There are currently no users." });
      }
      if (rows) {
        return res.status(200).json({ users: rows.rows });
      }
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    db.query(
      'SELECT first_name, last_name, username, email FROM users WHERE id = $1',
      [id],
      (err, rows) => {
        if (rows) {
          return res.status(202).json({ user: rows.rows[0] });
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const updateSingleUser = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    db.query(
      'UPDATE users SET first_name = $1, last_name = $2, username = $3 password = $4 WHERE id = $5',
      [username, hashedPassword, id],
      (err, rows) => {
        if (rows) {
          return res.status(202).json({ message: `User ${id} updated.` });
        }
      }
    );
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const deleteSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    db.query('DELETE FROM users WHERE id = $1', [id], (err, rows) => {
      if (rows) {
        return res.status(202).json({ message: `User ${id} deleted.` });
      }
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
