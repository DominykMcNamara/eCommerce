const Router = require('express-promise-router')
const userController = require('../controllers/userController')
const checkIfUserExists = require('../middleware/checkIfUserExists')
const router = new Router()

router.get('/', userController.getAllUsers)
router.get('/:id', [checkIfUserExists], userController.getSingleUser)
router.patch('/:id', [checkIfUserExists], userController.updateSingleUser)
router.delete('/:id', [checkIfUserExists], userController.deleteSingleUser)

module.exports = router