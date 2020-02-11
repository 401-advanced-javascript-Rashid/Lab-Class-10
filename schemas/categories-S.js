
'use strict';

// mongoose module
const mongoose = require('mongoose');

// create schema 
const Categories = mongoose.Schema({
  name : {type : String , required : true},
},{ toObject: { virtuals: true }, toJSON: { virtuals: true }});

// the virtual method
Categories.virtual('products' , {
  ref: 'products', localField: 'name', foreignField: 'type', justOne: true,
});
// join the virtual field
function link(){
  try{ this.populate('products');
  } catch (errors){
    console.error(errors);
  }
} 

Categories.pre('find', link);
Categories.pre('findOne', link);

module.exports = mongoose.model('categories', Categories);