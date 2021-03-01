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
        case "GET_TOTALS": {
            let cart = state.cart;
            let { total, amount } = cart.reduce(
                (cartTotal, cartItem) => {
                    cartTotal.amount += cartItem.amount;
                    cartTotal.total += cartItem.amount * cartItem.price;
                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );
            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount };
        }
        case "LOADING":
            return { ...state, loading: true };
        case "DISPLAY":
            return { ...state, cart: action.payload.data, loading: false };
        default:
            throw new Error("no matching action type");
    }
};
export default reducer;
