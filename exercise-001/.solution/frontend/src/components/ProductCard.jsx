import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    try {
      await addToCart(product.id);
    } finally {
      setAdding(false);
    }
  };

  const outOfStock = product.stock === 0;

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', width: '200px', borderRadius: '8px' }}>
      <h3 style={{ margin: '0 0 8px' }}>{product.name}</h3>
      <p style={{ margin: '4px 0', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
      <p style={{ margin: '4px 0', color: outOfStock ? 'red' : 'green' }}>
        {outOfStock ? 'Out of stock' : `${product.stock} available`}
      </p>
      <button
        onClick={handleAdd}
        disabled={outOfStock || adding}
        style={{
          marginTop: '8px',
          padding: '8px 16px',
          cursor: outOfStock ? 'not-allowed' : 'pointer',
          opacity: outOfStock ? 0.5 : 1,
        }}
      >
        {adding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
