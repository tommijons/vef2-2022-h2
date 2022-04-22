/* eslint-disable @next/next/no-img-element */
import { Layout } from "../components/layout/Layout"
import { Footer } from "../components/footer/Footer"
import { Restaurant } from "../api/globals"
import { useCartContext } from "../context/cartContext";
import { useEffect, useState } from "react";
import { CartProductsProps } from "../api/types";
import Router from "next/router";
import styles from '../styles/Home.module.css';

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
            const uid = JSON.parse(localStorage.getItem("cart")!);
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
            title='Karfa'
            footer={<Footer></Footer>}
            >
                <p>loading...</p>
            </Layout>
        )
    }

    return (
      <Layout title={Restaurant.name} footer={<Footer></Footer>}>
        <h2 className={styles.title1}>Karfa</h2>
        <hr className={styles.line}></hr>
        <section className={styles.cards}>
          {data.lines.map((item: CartProductsProps, i: number) => {
            return (
              <div className={styles.card} key={i}>
                <h3>
                  <p className={styles.title1}>{item.title}</p>
                </h3>
                <div className={styles.cardImage}>
                  <img
                    className={styles.cardImg}
                    style={{ width: '100%' }}
                    src={item.image}
                    alt={`Mynd af ${item.title}`}
                  />
                </div>
                <p>{item.price} kr.-</p>
                <p>Fjöldi: {item.quantity}</p>
                <p>Samtals: {item.total} kr.-</p>
              </div>
            );
          })}
        </section>
        <hr className={styles.line}></hr>
        <h2 className={styles.title1}>Panta</h2>
        <div className={styles.order}>
          <form
            className={styles.container}
            onSubmit={async (event: any) => {
              event.preventDefault();
              const name = event.target.name.value;
              const id = JSON.parse(localStorage.getItem('cart')!).id;
              const res = await fetch(
                `https://vef2-2022-h1-synilausn.herokuapp.com/orders`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ cart: id, name }),
                }
              );
              if (res.ok) {
                cartContext.setCart({});
                cartContext.setFjoldi(0);
                localStorage.removeItem('fjoldi');
                localStorage.removeItem('cart');
                Router.push(`/`);
              }
            }}
          >
            <label htmlFor='name'>Nafn:</label>
            <br />
            <input type='text' id='name'></input>
            <br />
            <button>Panta</button>
          </form>
        </div>
      </Layout>
    );
}