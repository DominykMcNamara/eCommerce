module.exports = (app) => {
   app.use('/register', require('./register'))
   app.use('/login', require('./login'))
   app.use('/logout', require('./logout'))
   app.use('/users', require('./users'))
   app.use('/products', require('./products'))
}