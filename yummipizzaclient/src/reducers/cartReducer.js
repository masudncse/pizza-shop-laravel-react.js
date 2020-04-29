const INITIAL_STATE = {
    cart: []
};

function cartReducer(state = INITIAL_STATE, action) {
    let cartObj = state.cart;

    switch (action.type) {
        case "ADD_CART_ITEM":
            cartObj.push(action.payload);
            return {
                ...state,
                cart: cartObj
            };
        case "UPDATE_CART_ITEMS":
            return {
                ...state,
                cart: action.payload
            };
        case "REMOVE_CART_ITEM":
            let newCartObj = cartObj.filter(item => {
                return item.productId !== action.productId
            });
            return {
                ...state,
                cart: newCartObj
            };
        case "REMOVE_ALL_CART_ITEMS":
            cartObj = [];
            return {
                ...state,
                cart: cartObj
            };
        default:
            return state;
    }
}

export default cartReducer;
