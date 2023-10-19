import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PRODUCTS } from '../utils/queries';
import { CREATE_INVOICE } from '../utils/mutations';
import auth from '../utils/auth';

const CreateInvoiceForm = () => {
  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [lineItems, setLineItems] = useState([]);
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [createInvoice] = useMutation(CREATE_INVOICE);

  const handleAddLineItem = () => {
    const lineItem = {
      product: selectedProduct,
      quantity: quantity,
    };
    setLineItems([...lineItems, lineItem]);
    setSelectedProduct('');
    setQuantity(0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createInvoice({
        variables: {
          invoiceDate,
          invoiceNumber,
          customer: { name: customerName, email: customerEmail },
          user: auth.getUser().data._id,
          lineItems: lineItems,
        },
      });
      alert('Invoice Created!');
      setInvoiceDate('');
      setInvoiceNumber('');
      setCustomerName('');
      setCustomerEmail('');
      setLineItems([]);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit} className="box">
        <h2 className="title is-2">Create a New Invoice</h2>
        <div className="field">
          <label className="label">Invoice Date:</label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Invoice Number:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Customer Name:</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Customer Email:</label>
          <div className="control">
            <input
              className="input"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Line Items:</label>
          <div className="control">
            <div className="select">
              <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                <option value="">Select a product</option>
                {data.products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <input
                className="input"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="control">
              <button className="button" onClick={handleAddLineItem}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-success" type="submit">
              Create Invoice
            </button>
          </div>
        </div>
      </form>
      <div className="box">
        <h3 className="title is-4">Added Products</h3>
        {lineItems.length > 0 ? (
          <ul>
            {lineItems.map((item, index) => {
              const product = data.products.find((product) => product._id === item.product);
              const productName = product ? product.name : 'Product name not available';
              const productPrice = product ? product.price : 'Product price not available';
              return (
                <li key={index}>
                  {productName} - Quantity: {item.quantity} - Price: ${productPrice}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No products added yet</p>
        )}
      </div>
      <Link to="/profile" className="button is-info">
        Return to Profile
      </Link>
    </div>
  );
};

export default CreateInvoiceForm;
