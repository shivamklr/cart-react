const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART": {
            return { ...state, cart: [] };
        }
        case "REMOVE": {
            let cart = state.cart;
            cart = cart.filter((item) => item.id !== action.payload.id);
            return { ...state, cart };
        }
        case "INCREASE": {
            console.log("increase called");
            let tempCart = state.cart.map((item) => {
                if (action.payload.id === item.id) {
                    let tempAmount = item.amount + 1;
                    return { ...item, amount: tempAmount };
                }
                return item;
            });
            return {
                ...state,
                cart: tempCart,
            };
        }
        case "DECREASE": {
            console.log("decrease called");
            let tempCart = state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    if (item.amount > 1) {
                        let newAmount = item.amount - 1;
                        return { ...item, amount: newAmount };
                    }
                }
                return item;
            });
            return { ...state, cart: tempCart };
        }
        default:
            throw new Error("You idiot. You forgot about something");
    }
};
export default reducer;
