import { useState } from "react";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { Layout } from '../../components/layout/Layout';
import { Footer } from "../../components/footer/Footer";
import { useCartContext } from "../../context/cartContext";

export default function OrdersPage({ uid }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {

    //const uid = JSON.parse(localStorage.getItem("cart")!).id;
    console.log("uid->", uid);
    const url = `ws://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}`;
    var wsConnection = new WebSocket(url, "protocolOne");

    wsConnection.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
      };

    wsConnection.onmessage = function (e) {
        console.log(e.data);
        alert(`Data received from server: ${e.data}`);
        var msg = JSON.parse(e.data);
    }

    wsConnection.onclose = function(e) {
        if (e.wasClean) {
          alert(`[close] Connection closed cleanly, code=${e.code} reason=${e.reason}`);
        } else {

          alert('[close] Connection died');
        }
      };
      wsConnection.onerror = function(error) {
        alert(`[error] ${error}`);
      };


    return (
        <Layout
        title="Mínar Pantanir"
        footer={
            <Footer></Footer>
        }
        >
            <div>Staða pöntunar: </div>
        </Layout>
    )
}

export const getServerSideProps = async ({ params }: { params: { uid: string }}) => {
    const uid = params.uid;
  
    return {
      props: { uid },
    }
  }