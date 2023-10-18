const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Product = model('Product', productSchema);

module.exports = Product;
