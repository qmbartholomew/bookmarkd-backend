//////////////////////////////////
// Dependencies
/////////////////////////////////
//Getting .env variables
require('dotenv').config()
//Pulling PORT from .env, giving it a default of 3002 (object destructuring)
const { PORT = 3002, DATABASE_URL } = process.env
//Importing express
const express = require('express')
//Creating  the application object
const app = express()
//Importing mongoose
const mongoose = require('mongoose')
//Importing middleware
const cors = require('cors')
const morgan = require('morgan')

/////////////////////////////////
// Database Connection
////////////////////////////////
//Establishing connection
mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

//Connection Events
mongoose.connection
  .on('open', () => console.log('You are connected to Mongo'))
  .on('close', () => console.log('You are disconnected from Mongo'))
  .on('error', error => console.log(error))

//////////////////////////////
// Models
//////////////////////////////
// The bookmark  schema
const BookmarkSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    image: String
  },
  { timestamps: true }
)

const Bookmark = mongoose.model('Bookmark', BookmarkSchema)

/////////////////////////////////
//Middleware
//////////////////////////////////
app.use(cors()) //Preventing cors errors, opening up access for frontend
app.use(morgan('dev')) //Logging
app.use(express.json()) //Parsing json bodies

////////////////////////////////
// Routes
////////////////////////////////
//Setting up a test route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Bookmark index route
//Getting request to /bookmark links, returning them all as json
app.get('/bookmark', async (req, res) => {
  try {
    //Sending all bookmark links
    res.json(await Bookmark.find({}))
  } catch (error) {
    res.status(400).json({ error })
  }
})
//Bookmark create route
//Posting request to /bookmark, using request body to make new bookmark links
app.post('/bookmark', async (req, res) => {
  try {
    //Creating a new bookmark link
    res.json(await Bookmark.create(req.body))
  } catch (error) {
    res.status(400).json({ error })
  }
})
//Bookmark update  route
//Putting request /bookmark/:id, updates bookmark link based on id with request body
app.put('/bookmark/:id', async (req, res) => {
  try {
    //Updating a bookmark link
    res.json(
      await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    )
  } catch (error) {
    res.status(400).json({ error })
  }
})
// Destroy Route
//Deleting request to /bookmark/:id, deletes the bookmark link specified
app.delete('/bookmark/:id', async (req, res) => {
  try {
    //Deleting a bookmark link
    res.json(await Bookmark.findByIdAndRemove(req.params.id))
  } catch (error) {
    res.status(400).json({ error })
  }
})

/////////////////////////////////
// Server Listener
/////////////////////////////////
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`)
})
