const isAuthenticated = require('../middleware/isAuthenticated')
module.exports = (app) => {
   app.use('/register', require('./register'))
   app.use('/login', require('./login'))
   app.use('/logout', [isAuthenticated], require('./logout'))
   app.use('/users', [isAuthenticated], require('./users'))
   app.use('/products', require('./products'))
}