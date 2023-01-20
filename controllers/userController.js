const db = require("../db/index");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    db.query('SELECT username, email FROM "User"', (err, rows) => {
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
      'SELECT username, email FROM "User" WHERE id = $1',
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
      'UPDATE "User" SET username = $1, password = $2 WHERE id = $3',
      [username, hashedPassword, id],
      (err, rows) => {
        if (rows) {
          console.log(rows);
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
  if (!id) {
    res.status(404).json({ message: "Please add an id URL parameter" });
  }
  try {
    db.query('DELETE FROM "User" WHERE id = $1', [id], (err, rows) => {
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
