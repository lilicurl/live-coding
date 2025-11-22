import { CartProvider, useCart } from './context/CartContext';
import { ProductCard } from './components/ProductCard';
import { CartView } from './components/CartView';
import { ErrorMessage } from './components/ErrorMessage';

function ShopContent() {
  const { products, loading } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Shop</h1>
      <ErrorMessage />
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <CartView />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}

export default App;
