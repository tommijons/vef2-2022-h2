import { useContext, createContext, useEffect, useState } from "react";

const cartId = {
    id:String
}
export const CartContext = createContext( {cart: cartId});

export function CartWrapper({ children }) {
    const [cart, setCart] = useState();

    useEffect(() => {
        const data = async () => {
            try {
                const response = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/cart', {
                    method: 'POST'
                })
                const json = await response.json();
                setCart(json);
            } catch(e) {
                console.error('error: ', e);
            }
        };
        data();
    }, []);
    return (
        <CartContext.Provider value={{
            cart,
        }}>
            { children }
        </CartContext.Provider>
    );
}

export function useAppContext() {
    return useContext(CartContext);
}