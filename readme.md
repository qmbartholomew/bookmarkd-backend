###  Introduction
This is the backend or under-the-hood of a project called bookmark. This project serves as a  backend designed to work with the frontend of the app. It receives requests from the frontend, and forwards these requests back with their respective answers. The server is implemented in Express using Mongoose. 

Bookmark'd  is one of the projects I've been working on at General Assembly. This project was completed in a team of three software engineers and was our first attempt at putting together a full stack web application. 

### Teammates
- Jerathel
- Quentin
- Ras
 
 <a href="https://penguin-bookmarkd-backend.herokuapp.com/">Live Link</a>


### Technologies used
1- Express/Node
2- Mongo/Mongoose 
3- Dotenv 
4- Cors 
5- Morgan
6- React

### List of dependencies
```js
require('dotenv').config()
const {PORT = 3002, DATABASE_URL} = process.env
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
```


### Model
```js
// The bookmark schema
const BookmarkSchema = new mongoose.Schema(
{
title: String,
url: String,
image: String
},
{ timestamps: true }
)

const Bookmark = mongoose.model('Bookmark', BookmarkSchema)
```

### Middleware
```Js
/_ MIDDLEWARE _/
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
```

### Project Backend Overview
This bookmark project is a three-person group project and each person gets assigned a specific piece of it to work on. This is an app that lets the user add a title and a link to helpful websites. When a title is clicked, it should take the user to the linked website.

### Backend Route Table
| url             | method | action                       |
| --------------- | ------ | ---------------------------- |
| /bookmark/      | get    | get all bookmarks (index)    |
| /bookmark       | post  | create a new bookmark         |
| /bookmark/:id   | put    | update a bookmark            |
| /bookmark/:id   | delete | delete a bookmark            |

### Roadblocks
One of the major roadblock we encountered was deciding how to divide the project for a three person group, and also handling merge conflicts. I personally cloned a repo inside of another repo and had trouble switching to the dev branch. I took me a while to get it all fixed.