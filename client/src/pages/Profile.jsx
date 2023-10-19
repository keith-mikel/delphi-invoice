import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_INVOICES } from '../utils/queries';
import { DELETE_INVOICE } from '../utils/mutations';
import AuthService from '../utils/auth';

const DeleteInvoiceButton = ({ invoiceId }) => {
  const [deleteInvoice] = useMutation(DELETE_INVOICE, {
    refetchQueries: [{ query: GET_INVOICES }],
  });

  const handleDelete = async () => {
    try {
      await deleteInvoice({
        variables: {
          invoiceId: invoiceId,
        },
      });
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <button className="button is-danger" onClick={handleDelete}>
      Delete
    </button>
  );
};

const Profile = () => {
  if (!AuthService.loggedIn()) {
    return (
      <div className="container">
        <p>You need to be logged in to access this page.</p>
      </div>
    );
  }

  const { loading, error, data } = useQuery(GET_INVOICES);

  if (loading) {
    return <p>Loading invoices...</p>;
  }

  if (error) {
    return <p>Error loading invoices: {error.message}</p>;
  }

  const invoices = data.invoices;

  return (
    <div className="container">
      <h1 className="title is-1">Invoices</h1>
      <Link to="/invoice">
        <button className="button is-primary">Create New Invoice</button>
      </Link>
      <Link to="/update">
        <button className="button is-info">Update Product Price</button>
      </Link>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice._id} className="box">
            <p>Invoice Number: {invoice.invoiceNumber}</p>
            <p>Customer Name: {invoice.customer.name}</p>
            <p>Invoice Date: {invoice.invoiceDate}</p>
            <p>User: {invoice.user.username}</p>
            <ul>
              {invoice.lineItems.map((lineItem, index) => (
                <li key={index} className="notification">
                  <p>Product Name: {lineItem.product.name}</p>
                  <p>Product Price: {lineItem.product.price}</p>
                  <p>Quantity: {lineItem.quantity}</p>
                </li>
              ))}
            </ul>
            <DeleteInvoiceButton invoiceId={invoice._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
