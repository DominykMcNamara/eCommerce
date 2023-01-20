const db = require("../db/index");

const getAllProducts = async (req, res) => {
  try {
    db.query('SELECT * FROM "Product"', (err, rows) => {
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
  const { id } = req.params;
  try {
    db.query('SELECT * FROM "Product" WHERE id = $1', [id], (err, rows) => {
      if (rows) {
        return res.status(202).json({ product: rows.rows[0] });
      }
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    db.query(
      'INSERT INTO "Product"(name, description, price) Values($1, $2, $3)',
      [name, description, price],
      (err, rows) => {
        if (rows) {
          return res.status(201).json({ message: `Product ${name} created!` });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
    const { id } = req.params
    const {name, description, price, image } = req.body
    try {
        db.query('UPDATE "Product" SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5', [name, description, price, image, id], (err, rows) => {
            if (rows) {
                return res.status(202).json({ message: `Product ${ id } updated`})
            }
        })
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}

const deleteSingleProduct = async (req, res) => {
    const { id } = req.params
    try {
        db.query('DELETE FROM "Product" WHERE id = $1', [id], (err, rows) => {
            if (rows) {
                return res.status(202).json({ message: `Product ${id} deleted.` }); 
            }
        })
    } catch (err) {
        return res.status(404).json({ message: err.message })
    }
}

module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteSingleProduct };
