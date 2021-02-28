import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
    loading: true,
    cart: cartItems,
    total: 0,
    amount: 0,
};

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const clearCart = () => {
        console.log("clear cart clicked");
        dispatch({ type: "CLEAR_CART" });
    };
    const remove = (id) => {
        dispatch({ type: "REMOVE", payload: { id } });
    };
    const increase = (id) => {
        dispatch({ type: "INCREASE", payload: { id } });
    };
    const decrease = (id) => {
        dispatch({ type: "DECREASE", payload: { id } });
    };
    const fetchData = async (url) => {
        dispatch({ type: "LOADING" });
        const response = await fetch(url);
        const data = await response.json();
        dispatch({ type: "DISPLAY", payload: { data } });
    };
    useEffect(() => {
        fetchData(url);
    }, []);
    useEffect(() => {
        dispatch({ type: "GET_TOTALS" });
    }, [state.cart]);
    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                remove,
                increase,
                decrease,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
// make sure use
export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
