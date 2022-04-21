import { Layout } from "../components/layout/Layout"
import { Footer } from "../components/footer/Footer"
import { Restaurant } from "./api/globals"
import { Button } from "../components/form/Button";
import { GetServerSideProps } from "next";
import { useCartContext } from "../context/cartContext";
import { useEffect, useState } from "react";
import { CartProductsProps } from "./api/types";
import Router from "next/router";

// TODO: Birta allt í körfu og búa til pöntun...
export default function Cart() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ lines: [] });
    const cartContext = useCartContext();

    useEffect(() => {
        const getCart = async () => {
            if(localStorage.getItem("cart") === null) {
                await cartContext.newCart();
            }
            const uid = JSON.parse(localStorage.getItem("cart"));
            const res = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/cart/${uid.id}`);
            const cart = await res.json();
            setData(cart);
            setLoading(false);
        }
        getCart();
    }, [cartContext])
    
    if(loading) {
        return (
            <Layout
            title='Flokkar'
            footer={<Footer></Footer>}
            >
                <p>loading...</p>
            </Layout>
        )
    }

    return(
        <Layout
        title={Restaurant.name}

        footer={
            <Footer></Footer>
        }>
            {data.lines.map((item: CartProductsProps,i: number) => {
                return (
                <div key={i}>
                    <h3>
                        <p>{item.title}</p>
                    </h3>
                    <img
                    src={item.image}
                    alt={`Mynd af ${item.title}`}
                    />
                    <p>{item.price} kr.-</p>
                    <p>Fjöldi: {item.quantity}</p>
                    <p>Samtals: {item.total} kr.-</p>
                </div>
                )
            })}
            <form onSubmit={async (event:any) => {
                event.preventDefault();
                const name = event.target.name.value;
                const id = JSON.parse(localStorage.getItem("cart")).id;
                const res = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cart: id, name}),
                })
                if(res.ok) {
                  cartContext.setCart({});
                  cartContext.setFjoldi(0);
                  localStorage.removeItem("fjoldi");
                  localStorage.removeItem("cart");
                  Router.push(`/`)
                }
            }}>
                <label htmlFor="name">Nafn:</label><br/>
                <input type='text' id='name'></input><br/>
                <button>Panta</button>
            </form>
        </Layout>
    )
}