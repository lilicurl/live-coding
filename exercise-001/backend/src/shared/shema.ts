export const schema = `
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
  }

  type CartItem {
    productId: ID!
    quantity: Int!
  }

  type Query {
    products: [Product!]!
    cart: [CartItem!]!
  }

  type Mutation {
    addToCart(productId: ID!, quantity: Int!): [CartItem!]!
    removeFromCart(productId: ID!): [CartItem!]!
  }
`;