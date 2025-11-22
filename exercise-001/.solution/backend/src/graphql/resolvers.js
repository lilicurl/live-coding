import { store } from '../data/store.js';
import { cartService, CartServiceError } from '../services/cartService.js';

export const resolvers = {
  Query: {
    products: () => store.getProducts(),
    cart: () => store.getCart(),
  },

  CartItem: {
    product: (cartItem) => store.getProductById(cartItem.productId),
  },

  Mutation: {
    addToCart: (_, { productId, quantity }) => {
      try {
        return cartService.addToCart(productId, quantity);
      } catch (error) {
        if (error instanceof CartServiceError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },

    removeFromCart: (_, { productId }) => {
      try {
        return cartService.removeFromCart(productId);
      } catch (error) {
        if (error instanceof CartServiceError) {
          throw new Error(error.message);
        }
        throw error;
      }
    },
  },
};
