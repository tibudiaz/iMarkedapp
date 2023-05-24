const initialState = {
    cart: [],
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case 'REMOVE_ITEM_FROM_CART':
        const updatedCart = state.cart.filter((item, index) => index !== action.payload);
        return {
          ...state,
          cart: updatedCart,
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  