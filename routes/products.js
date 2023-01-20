const Router = require('express-promise-router')
const router = new Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getSingleProduct)

module.exports = router