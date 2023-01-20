const Router = require('express-promise-router')
const userController = require('../controllers/userController')
const router = new Router()

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUser)
router.patch('/:id', userController.updateSingleUser)
router.delete('/:id', userController.deleteSingleUser)

module.exports = router