import { useCart } from '../context/CartContext';

export function CartView() {
  const { cart, products, cartTotal, cartCount, removeFromCart } = useCart();

  const getProduct = (productId) => products.find(p => p.id === productId);

  if (cart.length === 0) {
    return (
      <div style={{ marginTop: '40px' }}>
        <h2>Cart</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Cart ({cartCount} items)</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map(item => {
          const product = getProduct(item.productId);
          return (
            <li key={item.productId} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>{product?.name || 'Unknown'}</span>
              <span style={{ marginLeft: '16px' }}>x {item.quantity}</span>
              <span style={{ marginLeft: '16px' }}>${((product?.price || 0) * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeFromCart(item.productId)}
                style={{ marginLeft: '16px' }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
      <p style={{ fontWeight: 'bold', fontSize: '1.2em', marginTop: '16px' }}>
        Total: ${cartTotal.toFixed(2)}
      </p>
    </div>
  );
}
