const reducer = (state, action) => {
    switch (action.type) {
        case "CLEAR_CART":
            return { ...state, cart: [] };
        default:throw new Error("You idiot. You forgot about something")
    }
};
export default reducer;
