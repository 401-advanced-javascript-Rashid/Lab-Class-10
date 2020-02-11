'use strict';

// server 
const server = require('./lib/server.js');

// mongoose module
const mongoose =require('mongoose');

// Mongodb url
const MONGODB_URI = 'mongodb://localhost:27017/lab_08' ;


// Mongodb options
const mongooseOptions = {
  useNewUrlParser: true ,
  useCreateIndex: true ,
  useUnifiedTopology: true,
  useFindAndModify: true,
};


// connect mongodb and pass param
mongoose.connect(MONGODB_URI, mongooseOptions);

// start the server
server.start();