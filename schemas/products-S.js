'use strict';


const mongoose = require('mongoose') ;

const Products = mongoose.Schema({
  tybe: {type: String , required : true},
  price: {type: Number , required : true},
});

module.exports = mongoose.model('products', Products);