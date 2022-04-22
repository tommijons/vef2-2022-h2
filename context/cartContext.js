import { useContext, createContext, useEffect, useState } from "react";

const cartId = {
    id:String
}
export const CartContext = createContext();

export function CartWrapper({ children }) {
    const [cart, setCart] = useState({});
    const [fjoldi, setFjoldi] = useState(0);

    const newCart = async () => {
        try {
            const response = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/cart', {
                method: 'POST'
                })
                const json = await response.json();
                setCart(json);
                localStorage.setItem("cart", JSON.stringify(json));
                localStorage.setItem("fjoldi", 0)
            } catch(e) {
                console.error('error: ', e);
            }
        };
    
    const addItem = () => {
        const nyrFjoldi = fjoldi + 1;
        setFjoldi(nyrFjoldi);
        localStorage.setItem("fjoldi", nyrFjoldi);
    }
    const removeItem = () => {
        const nyrFjoldi = fjoldi - 1;
        setFjoldi(nyrFjoldi);
        localStorage.setItem("fjoldi", nyrFjoldi);
    }
    
    useEffect(() => {   
        if (JSON.parse(localStorage.getItem("cart"))) { 
          setCart(JSON.parse(localStorage.getItem("cart")));
        }
        if (JSON.parse(localStorage.getItem("fjoldi"))) {
            setFjoldi(JSON.parse(localStorage.getItem("fjoldi")));
        }
      }, []);

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            newCart,
            fjoldi,
            setFjoldi,
            addItem,
            removeItem,
        }}>
            { children }
        </CartContext.Provider>
    );
}

export function useCartContext() {
    return useContext(CartContext);
}