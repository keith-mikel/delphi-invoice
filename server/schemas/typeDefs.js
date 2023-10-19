const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String
    price: Float
  }

  type Customer {
    name: String!
    email: String!
    # Add other customer fields here if needed
  }

  type LineItem {
    product: Product!
    quantity: Int!
  }

  type User {
    _id: ID
    username: String
    email: String
    # Add other user fields here if needed
  }

  type Invoice {
    _id: ID!
    invoiceDate: String
    invoiceNumber: String
    customer: Customer
    lineItems: [LineItem!]
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

  type UpdateProductPriceResponse {
    name: String
    price: Float
  }

  # Query to fetch invoices, products, users, and current user
  type Query {
    products: [Product!]!
    invoices: [Invoice!]!
    users: [User]
    
    # Query to search invoices by product
    invoicesByProduct(productId: ID!): [Invoice!]!

    # Query to search invoices by customer
    invoicesByCustomer(customerName: String!): [Invoice!]!

    # Query to search invoices by date
    invoicesByDate(startDate: String!, endDate: String!): [Invoice!]!

    invoice(_id: ID!): Invoice

    # Query to fetch a user by ID
    user(userId: ID!): User

    # Query to fetch the currently authenticated user (me)
    me: User
  }

  # Mutation to create invoices, products, users, and delete invoices, products, and users
  type Mutation {
    createInvoice(
      invoiceDate: String
      invoiceNumber: String
      customer: CustomerInput
      lineItems: [LineItemInput!]
      user: ID!
    ): Invoice!

    deleteInvoice(invoiceId: ID!): Invoice

    updateUsername(id: ID, updatedUsername: String): User!

    createProduct(
      name: String
      price: Float
    ): Product!

    updateProductPrice(id: ID!, newPrice: Float!): UpdateProductPriceResponse

    deleteProduct(productId: ID!): Product

    # Mutation to create a user
    createUser(username: String!, email: String!, password: String!): Auth!

    # Mutation to delete a user by ID
    deleteUser(userId: ID!): User

    login(email: String!, password: String!): Auth
  }



  # Input types for creating invoices, line items, and users
  input CustomerInput {
    name: String
    email: String
    # Add other customer fields here if needed
  }

  input LineItemInput {
    product: ID
    quantity: Int
  }


`;

module.exports = typeDefs;


