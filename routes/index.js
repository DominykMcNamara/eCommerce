const userRouter = require('./user')
const authRouter = require('./auth')
module.exports = (app) => {
   userRouter(app)
   authRouter(app)
}