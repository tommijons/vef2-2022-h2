import { useState } from "react";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { Layout } from '../../components/layout/Layout';
import { Footer } from "../../components/footer/Footer";

export default function OrdersPage({ uid }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    
  //const [data, setData] = useState({ current_status: '' });
  const url = `ws://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}`;

  function connect() {
    var wsConnection = new WebSocket(url);

    wsConnection.onopen = function(e) {
        alert("WebSocket tenging!");
      };

    wsConnection.onmessage = function (e) {
        console.log(e.data);
        alert(`Pöntun: ${e.data}`);
        var msg = JSON.parse(e.data);
        //setData(msg);
    }

    wsConnection.onclose = function(e) {
      alert(`WebSocket tenging rofnaði, tilraun verður gerð til endurtengingar, code=${e.code} reason=${e.reason}`);
      setTimeout(function() {
        connect();
      }, 1000);
    };
    wsConnection.onerror = function(error) {
      alert(`error: ${error}`);
    };
  }
  
  connect();

    return (
        <Layout
        title="Mínar Pantanir"
        footer={
            <Footer></Footer>
        }
        >
            <section>
              <div>Staða Pöntunar: </div>
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