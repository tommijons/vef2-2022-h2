import { Button } from "../form/Button"
import { Restaurant } from "../../pages/api/globals";
import { useCartContext } from "../../context/cartContext";
import { useContext } from "react";

export default function Cart(productID: { product: number, quantity: number}) {
    const cartContext = useCartContext();
    async function onSubmit(e: any) {
        e.preventDefault();

        if(localStorage.getItem("cart") === null) {
            await cartContext.newCart();
        }
        const uid = JSON.parse(localStorage.getItem("cart") ?? '').id;
        const res = await fetch(`${Restaurant.url}/cart/${uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Accept-Encoding': 'gzip, deflate, br',
                Connection: 'keep-alive',
              },
            body: JSON.stringify({ uid, product: productID.product, quantity: productID.quantity }),
        });
        const result = await res.json();
        cartContext.addItem();
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