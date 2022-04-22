import { Button } from "../form/Button"
import { Restaurant } from "../../api/globals";
import { useCartContext } from "../../context/cartContext";
import s from "./Cart.module.scss"

export default function Cart(productID: { product: number, quantity: number}) {
    const cartContext = useCartContext();
    function cartMessage() {
        alert("Bætt í körfu!");
    }
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
        cartMessage();
        return result;
        };
    
    return (
        <section>
            <form className={s.cart__form} method="post" onSubmit={onSubmit}>
                <Button>Bæta í körfu</Button>
            </form>
        </section>
    )
}