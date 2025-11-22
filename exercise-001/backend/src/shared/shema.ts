export const schema = `
  type Product {
    id: ID!
    name: String!
    price: Float!
    stock: Int!
    cartIncluded: [CartItem!]
  }

  type CartItem {
    productId: ID!
    quantity: Int!
  }

  type Query {
    products: [Product!]!
    cart: [CartItem!]!
    product(id: ID!): Product
  }

  type Mutation {
    addToCart(productId: ID!, quantity: Int!): [CartItem!]!
    removeFromCart(productId: ID!): [CartItem!]!
  }
`;