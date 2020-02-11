'use strict';

// import schema and DB CRUD
const Mongo = require('./Mongo.js');
const schema = require( '../schemas/categories-S.js') ;


// categories class
class Catagories extends Mongo {
  constructor(){
    super(schema);
  }
}


module.exports = new Catagories ;