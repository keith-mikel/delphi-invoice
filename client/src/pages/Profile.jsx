import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_INVOICES } from '../utils/queries'; // Import your GET_INVOICES query
import AuthService from '../utils/auth'; // Import your AuthService

function Profile() {
  // Check if the user is authenticated
  if (!AuthService.loggedIn()) {
    return (
      <div>
        <p>You need to be logged in to access this page.</p>
        {/* You can add a login button or a link to the login page here */}
      </div>
    );
  }

  // If the user is authenticated, execute the GET_INVOICES query
  const { loading, error, data } = useQuery(GET_INVOICES);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  if (error) {
    return <p>Error loading invoices: {error.message}</p>;
  }

  const invoices = data.invoices;

  return (
    <div>
      <h1>Invoices</h1>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id}>
            <p>Invoice Number: {invoice.invoiceNumber}</p>
            <p>Customer Name: {invoice.customer.name}</p>
            <p>Invoice Date: {invoice.invoiceDate}</p>
            <p>User: {invoice.user.username}</p>
            <ul>
              {invoice.lineItems.map((lineItem, index) => (
                <li key={index}>
                  <p>Product Name: {lineItem.product.name}</p>
                  <p>Product Price: {lineItem.product.price}</p>
                  <p>Quantity: {lineItem.quantity}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
