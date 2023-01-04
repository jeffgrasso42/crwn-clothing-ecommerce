import { createContext, useState, useEffect } from "react";

// Helper Functions

/**
 * Updates the cart either by adding a new product or increasing the quantity of an existing product
 * 
 * @param {array} cartItems the items currently in the CartContext's cartItems variable 
 * @param {object} productToAdd the product to add to the cart
 * @returns updated array of cart items
 */
const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === productToAdd.id 
      ? {...cartItem, quantity: cartItem.quantity + 1} 
      : cartItem
    );
  }

  // return new array with modified cartItems or new cart item
  return [...cartItems, {...productToAdd, quantity: 1}]
}

/**
 * Removes an item from the cart
 * 
 * @param {array} cartItems the items currently in the CartContext's cartItems variable
 * @param {object} cartItemToRemove the cartItem to decrement or remove
 * @returns {array} updated array of cart items
 */
const removeCartItem = (cartItems, cartItemToRemove) => {
  // find if cartItems contains cart item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is--remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id)
  }

  // return back cartItems with decremented quantity for matching cart item
  return cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id 
    ? {...cartItem, quantity: cartItem.quantity - 1} 
    : cartItem
  );
};

/**
 * Clears a product from the cart
 * 
 * @param {array} cartItems the items currently in the CartContext's cartItems variable
 * @param {object} cartItemToClear the product to completely remove from cartItems array
 * @returns updated array of cart items
 */
const clearCartItem = (cartItems, cartItemToClear) => 
  cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

// Exports

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({children}) => {
  // Stateful variables
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // Hooks
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    );

    setCartCount(newCartCount);
  }, [cartItems]);
  
  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + (cartItem.price * cartItem.quantity), 0
    );

    setCartTotal(newCartTotal);
  }, [cartItems]);

  // Methods
  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  }

  const clearItemFromCart = (cartItemToRemove) => {
    setCartItems(clearCartItem(cartItems, cartItemToRemove));
  }
  
  const value = { 
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};