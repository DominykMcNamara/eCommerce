module.exports = (app) => {
   app.use('/register', require('./register'))
   app.use('/login', require('./login'))
}