// server.js
// the node app starts

// init project
'use strict';

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const dns = require('dns');
const URL = require('url').URL;  // a module URL has utilities for URL resolution and parsing
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC 
let cors = require('cors');
app.use(cors());

// basic configuration 
let port = process.env.PORT || 3000;

// connect to the DB
let db = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
  if (error) console.log(error);
    console.log("connection to the DB successful");
});

// create a new Schema with following schema types
const urlSchema = new mongoose.Schema({
  originalURL: String,
  shortenedURL: String
}, {timestamps: true});

// create a model that allows to create instance of objects--documents
const Model = mongoose.model('shortURL', urlSchema);
module.exports = Model;

// this project needs to parse POST bodies--the body-parser mounted here
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));  // configuration option to use the classic encoding
app.use(bodyParser.json())

// to serve the static CSS file from the public folder by using the 
// built-in middleware function in Express
app.use('/', express.static(process.cwd() + '/public'));

// routing--how the app responds to a client request to a particular endpoint
// when the route is matched, the handler function is executed--responds with the index.html file
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// post data to the server
// request a URL, get its hostname, check if it is valid, if yes, send the URL and the shortened URL to the DB
app.post('/api/shorturl/new', (req, res, next) => {
  const originalURL = req.body.url;
  const urlObject = new URL(originalURL);
  dns.lookup(urlObject.hostname, (err, address, family) => {
    if (err) {
      res.json({
        originalURL: originalURL,
        shortenedURL: "Invalid URL"
      });
    } else {
      let shortenedURL = Math.floor(Math.random()*100000).toString();
      
      // create an object(document) and save it to the DB
      let data = new Model({
        originalURL: originalURL,
        shortenedURL: shortenedURL
        });
    
      data.save((err, data) => {
        if (err) {
          console.error(err);
                 }
      });
    
      res.json({
        originalURL: originalURL,
        shortenedURL: shortenedURL
      })
    };
  });
});

// get a shortened URL, find its correspondent original URL in the DB and redirect to it
app.get('/api/shorturl/:urlToForward', (req, res, next) => {
  let shortenedURL = req.params.urlToForward;
  
  Model.findOne({shortenedURL: shortenedURL}, (err, data) => {
    if (err) {
      res.send("Error reading database.")
    }
    res.redirect(301, data.originalURL);
  });
});

// listen for requests
app.listen(port, () => {
  console.log('Node.js listening ...');
});