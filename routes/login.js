const Router = require('express-promise-router')
const passport = require('passport')
require('../config/passport')
const router = new Router()

router.post('/password', passport.authenticate('local', {
    successRedirect: '/password',
    failureRedirect: '/register'
}))

module.exports = router