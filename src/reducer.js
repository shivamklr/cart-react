const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return { ...state, cart: [] };
        case "REMOVE":
            let cart = state.cart;
            cart = cart.filter((item) => item.id !== action.payload.id);
            return { ...state, cart };
        default:
            throw new Error("You idiot. You forgot about something");
    }
};
export default reducer;
