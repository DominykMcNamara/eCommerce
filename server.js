const express = require('express')
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const bodyParser = require('body-parser')
const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 3500

app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(morgan("dev"))

app.listen(PORT, () => console.log(`Server running on ${ PORT }.`))