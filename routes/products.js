const Router = require("express-promise-router");
const router = new Router();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getSingleProduct);
router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct)

module.exports = router;
