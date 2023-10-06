const { Product, Invoice, User } = require('../models');
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    invoices: async () => {
      try {
        const invoices = await Invoice.find();
        return invoices;
      } catch (err) {
        throw err;
      }
    },

    invoicesByProduct: async (_, { productId }) => {
      try {
        const invoices = await Invoice.find({ 'lineItems.product': productId });
        return invoices;
      } catch (err) {
        throw err;
      }
    },

    invoicesByCustomer: async (_, { customerName }) => {
      try {
        const invoices = await Invoice.find({ 'customer.name': customerName });
        return invoices;
      } catch (err) {
        throw err;
      }
    },

    invoicesByDate: async (_, { startDate, endDate }) => {
      try {
        const invoices = await Invoice.find({
          invoiceDate: { $gte: startDate, $lte: endDate },
        });
        return invoices;
      } catch (err) {
        throw err;
      }
    },

    products: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (err) {
        throw err;
      }
    },

    // Query to fetch a user by ID
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        throw err;
      }
    },

    // Query to fetch the currently authenticated user (me)
    me: async (_, __, { user }) => {
      // 'user' is the currently authenticated user obtained from the authentication middleware
      return user;
    },
  },

  Mutation: {
    createInvoice: async (_, { invoiceDate, invoiceNumber, customer, user, lineItems }) => {
      try {
        const invoice = await Invoice.create({
          invoiceDate,
          invoiceNumber,
          customer,
          user,
          lineItems,
        });
        return invoice;
      } catch (err) {
        throw err;
      }
    },

    deleteInvoice: async (_, { invoiceId }) => {
      try {
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
        if (!deletedInvoice) {
          throw new Error('Invoice not found');
        }
        return deletedInvoice;
      } catch (err) {
        throw err;
      }
    },

    createProduct: async (_, { name, price }) => {
      try {
        const product = await Product.create({ name, price });
        return product;
      } catch (err) {
        throw err;
      }
    },

    deleteProduct: async (_, { productId }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
          throw new Error('Product not found');
        }
        return deletedProduct;
      } catch (err) {
        throw err;
      }
    },

    // Mutation to create a user
    createUser: async (_, { username, email, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        return user;
      } catch (err) {
        throw err;
      }
    },

    // Mutation to delete a user by ID
    deleteUser: async (_, { userId }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          throw new Error('User not found');
        }
        return deletedUser;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = resolvers;
