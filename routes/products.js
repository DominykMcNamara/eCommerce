const Router = require("express-promise-router");
const router = new Router();
const productController = require("../controllers/productController");
const checkIfProductExists = require("../middleware/checkIfProductExists")

router.get("/", productController.getAllProducts);
router.get("/:id", [checkIfProductExists], productController.getSingleProduct);
router.post("/", productController.createProduct);
router.patch("/:id", [checkIfProductExists],  productController.updateProduct)
router.delete("/:id", [checkIfProductExists], productController.deleteSingleProduct)

module.exports = router;
