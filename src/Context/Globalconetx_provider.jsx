import { useReducer } from 'react';
import Global_Context from './global_context';

function Globalconetx_provider({ children }) {
  function getFromLocalStorage(key) {
    const cart = localStorage.getItem(key);
    return cart ? JSON.parse(cart) : { cart: [], cartcount: 0, cartAmount: 0 };
  }

  const initialCart = getFromLocalStorage('cart');

  function setInLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'Add': {
        const existingItem = state.cart.find((item) => item.id === action.payload.id);
        let cartValue;

        if (existingItem) {
          cartValue = {
            cart: state.cart.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            cartcount: state.cartcount + 1,
            cartAmount: state.cartAmount + action.payload.price,
          };
        } else {
          cartValue = {
            cart: [...state.cart, { ...action.payload, quantity: 1 }],
            cartcount: state.cartcount + 1,
            cartAmount: state.cartAmount + action.payload.price,
          };
        }

        setInLocalStorage('cart', cartValue);
        return cartValue;
      }

      case 'Increase': {
        const cartValue = {
          cart: state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          cartcount: state.cartcount + 1,
          cartAmount: state.cartAmount + action.payload.price,
        };
        setInLocalStorage('cart', cartValue);
        return cartValue;
      }

      case 'Decrease': {
        const itemInCart = state.cart.find((item) => item.id === action.payload.id);

        if (itemInCart && itemInCart.quantity > 1) {
          const cartValue = {
            cart: state.cart.map((item) =>
              item.id === action.payload.id ? { ...item, quantity: item.quantity - 1 } : item
            ),
            cartcount: state.cartcount - 1,
            cartAmount: state.cartAmount - action.payload.price,
          };
          setInLocalStorage('cart', cartValue);
          return cartValue;
        } else {
          const updatedCart = state.cart.filter((item) => item.id !== action.payload.id);
          const cartValue = {
            cart: updatedCart,
            cartcount: Math.max(0, state.cartcount - 1),
            cartAmount: Math.max(0, state.cartAmount - (itemInCart ? itemInCart.price : 0)),
          };
          setInLocalStorage('cart', cartValue);
          return cartValue;
        }
      }

      case 'Remove': {
        const updatedCart = state.cart.filter((item) => item.id !== action.payload);
        const cartValue = {
          cart: updatedCart,
          cartcount: Math.max(0, state.cartcount - 1),
          cartAmount: Math.max(0, state.cartAmount - (state.cart.find(item => item.id === action.payload)?.price || 0)),
        };
        setInLocalStorage('cart', cartValue);
        return cartValue;
      }

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialCart);

  return (
    <Global_Context.Provider value={{
      cartdispatch: dispatch,
      cart: state.cart,
      cartcount: state.cartcount,
      cartAmount: state.cartAmount,
    }}>
      {children}
    </Global_Context.Provider>
  );
}

export default Globalconetx_provider;
