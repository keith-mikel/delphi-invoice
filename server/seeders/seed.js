const db = require('../config/connection');
const { Product, Invoice, User } = require('../models');
const { productsData, invoicesData } = require('./dataSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Product', 'products');
    await cleanDB('Invoice', 'invoices');
    await cleanDB('User', 'users');

    // Insert products into the database and store the inserted products
    const insertedProducts = await Product.insertMany(productsData);

    // Create users and store the created users
    const user1 = await User.create({
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    });

    const user2 = await User.create({
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    });

    // Update the invoice data with actual product and user ObjectId references
    const updatedInvoicesData = invoicesData.map((invoice, index) => {
      const updatedLineItems = invoice.lineItems.map((lineItem) => {
        // Assign the ObjectId of the corresponding product to the line item
        lineItem.product = insertedProducts[index]._id;
        return lineItem;
      });

      // Assign the ObjectId of the user to the invoice
      invoice.user = index % 2 === 0 ? user1._id : user2._id;

      return { ...invoice, lineItems: updatedLineItems };
    });

    // Insert the updated invoice data into the database
    await Invoice.insertMany(updatedInvoicesData);

    console.log('All done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
