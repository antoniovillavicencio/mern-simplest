// MARK: Imports
import express from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
import template from './../template.js';
import devBundle from './devBundle' // Only for development mode

// MARK: Constants
const CURRENT_WORKING_DIR = process.cwd();

// MARK: Initialize Express App
const app = express();
devBundle.compile(app); // Only for development. Compiles the client with webpack to generate bundle.js

// MARK: Middlewares
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))); //Serve static files on localhost:3000/dist/... 

// MARK: Connect MongoDB
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to MongoDB Server")
  db.close();
})

// MARK: Routing
app.get('/', (req, res) => {
  res.status(200).send(template());
})

// MARK: Init Webserver
let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if(err) {
    console.log('Error!!!:' + err);
  }
  console.info('Server started on port %s.', port);
})