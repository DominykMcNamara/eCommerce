const db = require("../db/index");

const getAllProducts = async (req, res) => {
  try {
    db.query("SELECT * FROM Product", (err, rows) => {
      if (rows.rows.length === 0) {
        return res
          .status(200)
          .json({ message: "There are currently no products." });
      }
      if (rows) {
        return res.status(202).json({ products: rows.rows });
      }
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getSingleProduct = async (req, res) => {
    const { id } = req.params
    try {
        db.query("SELECT * FROM Product WHERE id = $1", [id], (err, rows) => {
            if (rows) {
                return res.status(202).json({ product: rows.rows[0]})
            }
        })
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}

module.exports = { getAllProducts, getSingleProduct };
