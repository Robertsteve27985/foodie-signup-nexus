
// Cart item type definition
/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} image
 */

// Get cart from localStorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Add item to cart
export const addToCart = (item) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item
    cart.push(item);
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event('cartUpdated'));
};

// Remove item from cart
export const removeFromCart = (itemId) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // Dispatch a custom event to notify other components
  window.dispatchEvent(new Event('cartUpdated'));
};

// Update item quantity
export const updateCartItemQuantity = (itemId, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item.id === itemId);
  
  if (item) {
    item.quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

// Get cart total price
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Get cart item count
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
