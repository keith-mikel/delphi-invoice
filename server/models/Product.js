const { Schema, model } = require('mongoose');

const productSchema = new Schema({

name: {
    type: String,
    required: true,
},
price: {
    type: Number,
    required: true,
},
quantity: {
    type: Number,
    required: true,
}
});

const Invoice = model('Product', productSchema);

module.exports = Invoice;