const Router = require("express-promise-router");
const router = new Router();
const cartController = require('../controllers/cartController')
router.get('/', cartController.getAllUsersCarts)

module.exports = router