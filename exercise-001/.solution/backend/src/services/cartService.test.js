import { cartService, CartServiceError } from './cartService.js';
import { store } from '../data/store.js';

describe('CartService', () => {
  beforeEach(() => {
    store.reset();
  });

  describe('addToCart', () => {
    it('should add product to cart and decrease stock', () => {
      const result = cartService.addToCart('1', 2);

      expect(result.cart).toHaveLength(1);
      expect(result.cart[0]).toEqual({ productId: '1', quantity: 2 });
      expect(result.products.find(p => p.id === '1').stock).toBe(8);
    });

    it('should throw error for insufficient stock', () => {
      expect(() => cartService.addToCart('1', 100)).toThrow('Insufficient stock');
    });

    it('should throw error for invalid product', () => {
      expect(() => cartService.addToCart('999', 1)).toThrow('Product not found');
    });

    it('should throw error for invalid quantity', () => {
      expect(() => cartService.addToCart('1', 0)).toThrow('Quantity must be positive');
    });
  });

  describe('removeFromCart', () => {
    it('should remove from cart and restore stock', () => {
      cartService.addToCart('1', 2);
      const result = cartService.removeFromCart('1');

      expect(result.cart).toHaveLength(0);
      expect(result.products.find(p => p.id === '1').stock).toBe(10);
    });

    it('should throw error if item not in cart', () => {
      expect(() => cartService.removeFromCart('1')).toThrow('Item not in cart');
    });
  });
});
