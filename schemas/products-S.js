'use strict';

// mongoose module
const mongoose = require('mongoose') ;


// create schema 
const Products = mongoose.Schema({
  tybe: {type: String , required : true},
  price: {type: Number , required : true},
});

module.exports = mongoose.model('products', Products);