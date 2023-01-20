module.exports = (app) => {
   app.use('/register', require('./register'))
   app.use('/login', require('./login'))
   app.use('/users', require('./users'))
   app.use('/products', require('./products'))
}