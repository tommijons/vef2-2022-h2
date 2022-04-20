import { Button } from "../form/Button"
import { Restaurant } from "../../pages/api/globals";
import { CartContext } from "../../context/cartContext";
import { useContext } from "react";

export default function Cart(productID:any, quantity:any) {
    const context = useContext(CartContext);
    async function onSubmit(e: any) {
        e.preventDefault();
        
        const res = await fetch(`${Restaurant.url}/cart/${context.cart.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                Connection: 'keep-alive',
              },
            body: JSON.stringify({ productID, quantity }),
        });
        const result = await res.json();
        console.log('res-->', result);
        return result;
        };
    
    return (
        <section>
            <form method="post" onSubmit={onSubmit}>
                <Button>Bæta í körfu</Button>
            </form>
        </section>
    )
}