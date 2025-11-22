// Business logic layer - handles validation and operations
import { store } from '../data/store.js';

export class CartServiceError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

export const cartService = {
  addToCart(productId, quantity) {
    const product = store.getProductById(productId);

    if (!product) {
      throw new CartServiceError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    if (quantity <= 0) {
      throw new CartServiceError('Quantity must be positive', 'INVALID_QUANTITY');
    }

    const existingItem = store.getCartItem(productId);
    const currentInCart = existingItem?.quantity || 0;

    if (product.stock < quantity) {
      throw new CartServiceError(
        `Insufficient stock. Available: ${product.stock}`,
        'INSUFFICIENT_STOCK'
      );
    }

    store.addCartItem(productId, quantity);
    store.updateProductStock(productId, -quantity);

    return {
      cart: store.getCart(),
      products: store.getProducts(),
    };
  },

  removeFromCart(productId) {
    const item = store.getCartItem(productId);

    if (!item) {
      throw new CartServiceError('Item not in cart', 'ITEM_NOT_FOUND');
    }

    store.removeCartItem(productId);
    store.updateProductStock(productId, item.quantity);

    return {
      cart: store.getCart(),
      products: store.getProducts(),
    };
  },
};
