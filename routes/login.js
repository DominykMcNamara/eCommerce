const Router = require('express-promise-router')
const passport = require('passport')
require('../config/passport')
const router = new Router()

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/register'
}))

module.exports = router