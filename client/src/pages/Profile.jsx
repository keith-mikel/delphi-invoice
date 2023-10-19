import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_INVOICES } from '../utils/queries'; // Import your GET_INVOICES query
import { DELETE_INVOICE} from '../utils/mutations'; // Import your DELETE_INVOICE_MUTATION
import AuthService from '../utils/auth'; // Import your AuthService

const DeleteInvoiceButton = ({ invoiceId }) => {
  const [deleteInvoice] = useMutation(DELETE_INVOICE, {
    refetchQueries: [{ query: GET_INVOICES }], // Optionally refetch data after deletion
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

  return <button onClick={handleDelete}>Delete</button>;
};

const Profile = () => {
  if (!AuthService.loggedIn()) {
    return (
      <div>
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
    <div>
      <h1>Invoices</h1>
      <Link to="/invoice">
        <button>Create New Invoice</button>
      </Link>
      <Link to="/update">
        <button>Update Product Price</button>
      </Link>
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
            <DeleteInvoiceButton invoiceId={invoice._id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
