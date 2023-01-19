const Router = require('express-promise-router')
const registerController = require('../controllers/registerController')
const checkDuplicateUsername = require('../middleware/checkDuplicateUsername')
const router = new Router()

router.post('/', [checkDuplicateUsername], registerController.handleNewUser)

module.exports = router