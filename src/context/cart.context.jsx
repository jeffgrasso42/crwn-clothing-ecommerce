import { createContext, useReducer } from "react";

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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  IS_CART_OPEN: 'IS_CART_OPEN'
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}

export const CartProvider = ({children}) => {
  const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity, 0
    );

    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + (cartItem.price * cartItem.quantity), 0
    );

    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }})
  }

  // CartProvider helper functions
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToRemove) => {
    const newCartItems = clearCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.IS_CART_OPEN, payload: bool })
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