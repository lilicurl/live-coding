// STARTER CODE - This file has intentional issues for candidates to fix
// Problems: God component, no error handling, prop drilling, mixed concerns
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:4000/graphql';

// Everything in one component - anti-pattern!
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `query { products { id name price stock } cart { productId quantity } }`
      })
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.data.products);
        setCart(data.data.cart);
        setLoading(false);
      });
    // BUG: No error handling!
  }, []);

  // Add to cart - no validation, no error handling
  const addToCart = (productId) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation { addToCart(productId: "${productId}", quantity: 1) { productId quantity } }`
      })
    })
      .then(res => res.json())
      .then(data => {
        setCart(data.data.addToCart);
        // BUG: Not updating local product stock display
      });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `mutation { removeFromCart(productId: "${productId}") { productId quantity } }`
      })
    })
      .then(res => res.json())
      .then(data => {
        setCart(data.data.removeFromCart);
      });
  };

  if (loading) return <div>Loading...</div>;

  // TODO: Calculate cart total - not implemented!
  // TODO: Show error states - not implemented!

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Shop</h1>

      {/* Products - inline styles, no component extraction */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', width: '200px' }}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Cart - also no separation */}
      <h2 style={{ marginTop: '40px' }}>Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.productId}>
              Product {item.productId} x {item.quantity}
              <button onClick={() => removeFromCart(item.productId)} style={{ marginLeft: '10px' }}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* TODO: Show total price */}
    </div>
  );
}

export default App;
