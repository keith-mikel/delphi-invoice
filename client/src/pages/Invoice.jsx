import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../utils/queries'; // Replace 'path-to-your-file' with the actual file path
import { CREATE_INVOICE } from '../utils/mutations'; // Replace 'path-to-your-mutation' with the actual file path

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
          user: "6520431fc7a705d5cf3f26ef", // Replace with the actual user ID (maybe from local storage)
          lineItems: lineItems,
        },
      });
      console.log('Invoice created:', data.createInvoice);
      // Reset the form fields on successful submission
      setInvoiceDate('');
      setInvoiceNumber('');
      setCustomerName('');
      setCustomerEmail('');
      setLineItems([]);
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Invoice Date:
          <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Invoice Number:
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </label>
        <br />
        <label>
          Customer Email:
          <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Line Items:
          <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
            <option value="">Select a product</option>
            {data.products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button type="button" onClick={handleAddLineItem}>
            Add
          </button>
        </label>
        <br />
        <button type="submit">Create Invoice</button>
      </form>
      <div>
  <h3>Added Products</h3>
  {lineItems.length > 0 ? (
    <ul>
      {lineItems.map((item, index) => {
        const product = data.products.find((product) => product._id === item.product);
        const productName = product ? product.name : "Product name not available";
        const productPrice = product ? product.price : "Product name not available";
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
    </div>
  );
};

export default CreateInvoiceForm;
