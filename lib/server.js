'use strict' ;

// custom routes
const routers = require('../routes.js');

// express module
const express = require('express');

// morgan module
const morgan = require('morgan');

// cors module
const cors = require('cors');

// applications constants 
const server = express();

// 3d party dependencies 
let morgan = morgan('dev'); 
server.use(morgan);
server.use(cors());

// dynamic router
server.use(routers);

// middleware app
server.use(errorHandler);

// timeStamp middleware
const timeStamp = (req, res, next) => {
  req.requestTime = new Date();
  if (Date.now) { 
    Date.now = function() { 
      return new Date().getTime(); },
    console.log('The Time:' , req.requestTime.toString());
    next();
  }};
// 3d party middleware 
let json = express.json();
server.use(json);
// middleware app
server.use(timeStamp);

// errors Handlers middleware
function notFoundHandler(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found!';
  res.json({ error: 'Not Found'});
}

server.get('/crash-error', (req, res) => {
  throw new Error('Error');
});

function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Generic Server Error!';
  res.json({ error: err });
}

server.get('/test-error' , (req , res , next) => {
  throw errorHandler();
});

server.get('*' , notFoundHandler);

module.exports = {
  server: server,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    server.listen(PORT, () => console.log(`listening on ${PORT}`));
  },

};