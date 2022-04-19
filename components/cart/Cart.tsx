import { Button } from "../form/Button"
import { Restaurant } from "../../pages/api/globals";

export default function Cart(product:any) {
    
    async function onSubmit(e: any) {
        e.preventDefault();
        
        const res = await fetch(`${Restaurant.url}/cart`, {
            method: 'POST',
            //body: JSON.stringify({ product }),
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