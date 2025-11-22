import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { graphqlRequest } from '../hooks/useApi';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await graphqlRequest(`
        query {
          products { id name price stock }
          cart { productId quantity }
        }
      `);
      setProducts(data.products);
      setCart(data.cart);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    try {
      setError(null);
      const data = await graphqlRequest(`
        mutation AddToCart($productId: ID!, $quantity: Int!) {
          addToCart(productId: $productId, quantity: $quantity) {
            cart { productId quantity }
            products { id name price stock }
          }
        }
      `, { productId, quantity });
      setCart(data.addToCart.cart);
      setProducts(data.addToCart.products);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    try {
      setError(null);
      const data = await graphqlRequest(`
        mutation RemoveFromCart($productId: ID!) {
          removeFromCart(productId: $productId) {
            cart { productId quantity }
            products { id name price stock }
          }
        }
      `, { productId });
      setCart(data.removeFromCart.cart);
      setProducts(data.removeFromCart.products);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      products,
      cart,
      loading,
      error,
      addToCart,
      removeFromCart,
      cartTotal,
      cartCount,
      clearError: () => setError(null),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
