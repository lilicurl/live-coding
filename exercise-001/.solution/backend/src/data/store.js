// Data access layer - single source of truth for state
const initialProducts = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, stock: 10 },
  { id: '2', name: 'USB-C Cable', price: 12.99, stock: 50 },
  { id: '3', name: 'Laptop Stand', price: 45.00, stock: 5 },
  { id: '4', name: 'Mechanical Keyboard', price: 129.99, stock: 8 },
];

class Store {
  constructor() {
    this.products = initialProducts.map(p => ({ ...p }));
    this.cart = [];
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  updateProductStock(id, delta) {
    const product = this.getProductById(id);
    if (product) {
      product.stock += delta;
    }
    return product;
  }

  getCart() {
    return this.cart;
  }

  getCartItem(productId) {
    return this.cart.find(item => item.productId === productId);
  }

  addCartItem(productId, quantity) {
    const existing = this.getCartItem(productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ productId, quantity });
    }
  }

  removeCartItem(productId) {
    const item = this.getCartItem(productId);
    this.cart = this.cart.filter(i => i.productId !== productId);
    return item;
  }

  reset() {
    this.products = initialProducts.map(p => ({ ...p }));
    this.cart = [];
  }
}

export const store = new Store();
