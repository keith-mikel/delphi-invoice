const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
  invoiceDate: {
    type: Date,
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the Product model
  },
  customer: {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    // Other customer details
  },
  lineItems: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;
