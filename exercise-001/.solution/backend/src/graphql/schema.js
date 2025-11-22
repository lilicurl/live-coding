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
    product: Product
  }

  type CartMutationResult {
    cart: [CartItem!]!
    products: [Product!]!
  }

  type Query {
    products: [Product!]!
    cart: [CartItem!]!
  }

  type Mutation {
    addToCart(productId: ID!, quantity: Int!): CartMutationResult!
    removeFromCart(productId: ID!): CartMutationResult!
  }
`;
