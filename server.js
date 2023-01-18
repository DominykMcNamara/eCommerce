require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const session = require('express-session')
const corsOptions = require("./config/corsOptions")
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./config/Swagger')
const authenticateSession = require('./middleware/passport')
const PORT = process.env.PORT || 3500

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
app.use(morgan("dev"))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}))
app.use(authenticateSession)

app.listen(PORT, () => console.log(`Server running on ${ PORT }.`))