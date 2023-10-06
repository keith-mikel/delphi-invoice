const typeDefs = `
    type Invoice {
        _id: ID
        invoice: String!
        date: Date!
        vendor: String!
        lines: [Product]
    }

`;

module.exports = typeDefs;
