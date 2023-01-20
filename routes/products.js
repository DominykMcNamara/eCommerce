const Router = require('express-promise-router')
const router = new Router()
const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts)

module.exports = router