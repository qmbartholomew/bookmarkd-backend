/*          DEPENDENCIES            */
require('dotenv').config()
const {PORT = 3002, DATABASE_URL} = process.env
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

/*          DATABASE CONNECTION         */
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on('open', () => {console.log('Connected to Mongo')})
.on('close', () => {console.log('Disconnected from Mongo')})
.on('error', (error) => {console.log(error)})

/*          MIDDLEWARE          */
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

/*          ROUTES          */
app.get('/', (req, res) => {
    res.send('Hello World')
})


/*          SERVER LISTENER         */
app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})