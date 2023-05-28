export const login = (token) => ({
  type: 'LOGIN',
  token,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: product,
    };
  };
  
  export const removeItemFromCart = (index) => {
    return {
      type: 'REMOVE_ITEM_FROM_CART',
      payload: index
    };
  };
  
