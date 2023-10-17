// queries.js

import { gql } from '@apollo/client';

export const GET_INVOICES = gql`
query Invoices {
  invoices {
    _id
    customer {
      name
    }
    invoiceDate
    invoiceNumber
    lineItems {
      product {
        name
        price
      }
      quantity
    }
    user {
      username
    }
  }
}
`;


export const GET_INVOICES_BY_PRODUCT = gql`
  query getInvoicesByProduct($productId: ID!) {
    invoicesByProduct(productId: $productId) {
      _id
    }
  }
`;

export const GET_INVOICES_BY_CUSTOMER = gql`
  query getInvoicesByCustomer($customerName: String!) {
    invoicesByCustomer(customerName: $customerName) {
      _id
    }
  }
`;

export const GET_INVOICES_BY_DATE = gql`
  query getInvoicesByDate($startDate: Date!, $endDate: Date!) {
    invoicesByDate(startDate: $startDate, endDate: $endDate) {
      _id
    }
  }
`;

export const GET_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      price
    }
  }
`;
