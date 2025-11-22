import { useCart } from '../context/CartContext';

export function ErrorMessage() {
  const { error, clearError } = useCart();

  if (!error) return null;

  return (
    <div style={{
      background: '#fee',
      border: '1px solid #f00',
      padding: '12px',
      borderRadius: '4px',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span>{error}</span>
      <button onClick={clearError}>Dismiss</button>
    </div>
  );
}
