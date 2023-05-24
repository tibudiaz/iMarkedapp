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