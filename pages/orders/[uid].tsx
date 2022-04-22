import { useState } from "react";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { Layout } from '../../components/layout/Layout';
import { Footer } from "../../components/footer/Footer";
import styles from '../../styles/Home.module.css';

export default function OrdersPage({ uid }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    
  const url = `wss://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}`;
  const [state, setState] = useState('');

  useEffect(() => {
    function connect() {
      var wsConnection = new WebSocket(url);
  
      wsConnection.onopen = function(e) {
      };
  
      wsConnection.onmessage = function (e) {
        var msg = JSON.parse(e.data);
        setTimeout(() => {
        if(msg.order.newStatus !== undefined) {
          setState(msg.order.newStatus);
        } else {
          setState(msg.order.current_status);
        }
        }, 1000);
      }
  
      wsConnection.onclose = function(e) {
        setTimeout(function() {
          connect();
        }, 1000);
      };
      wsConnection.onerror = function(error) {
        alert(`error: ${error}`);
      };
    }
    connect();
  }, []);

    return (
        <Layout
        title="Mínar Pantanir"
        footer={
            <Footer></Footer>
        }
        >
            <section className={styles.main}>
              <div className={styles.title}>Staða Pöntunar: {state}</div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }: { params: { uid: string }}) => {
    const uid = params.uid;
  
    return {
      props: { uid },
    }
  }