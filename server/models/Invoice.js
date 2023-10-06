const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
    invoice: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    vendor: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});

const Invoice = model('Invoice', invoiceSchema);

module.exports = Invoice;