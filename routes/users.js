const Router = require('express-promise-router')
const userController = require('../controllers/userController')
const router = new Router()

router.get('/', userController.getAllUsers)

module.exports = router