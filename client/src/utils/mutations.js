import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
  `;


export const CREATE_USER = gql `
mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`;

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($invoiceDate: String!, $invoiceNumber: String!, $customer: CustomerInput!, $user: ID!, $lineItems: [LineItemInput!]!) {
    createInvoice(invoiceDate: $invoiceDate, invoiceNumber: $invoiceNumber, customer: $customer, user: $user, lineItems: $lineItems) {
      _id
      invoiceDate
      invoiceNumber
      customer {
        name
        email
      }
      lineItems {
        product {
          _id
          name
          price
        }
        quantity
      }
    }
  }
`;

export const DELETE_INVOICE = gql`
  mutation deleteInvoice($invoiceId: ID!) {
    deleteInvoice(invoiceId: $invoiceId) {
      _id
    }
  }
`;

export const UPDATE_PRODUCT_PRICE = gql`
  mutation updateProductPrice($id: ID!, $newPrice: Float!) {
    updateProductPrice(id: $id, newPrice: $newPrice) {
      name
      price
    }
  }
`;

