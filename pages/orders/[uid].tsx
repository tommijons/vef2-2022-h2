import { useState } from "react";
import { useEffect } from "react";
import { InferGetServerSidePropsType } from "next";
import { Layout } from '../../components/layout/Layout';
import { Footer } from "../../components/footer/Footer";

export default function OrdersPage({ uid }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    
  const url = `wss://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}`;
  const [data, setData] = useState({ order: { current_status: ''}})

  useEffect(() => {
    function connect() {
      var wsConnection = new WebSocket(url);

      wsConnection.onopen = function(e) {
        
      };

      wsConnection.onmessage = function (e) {      
          var msg = JSON.parse(e.data);
          setData(msg);
      }

      wsConnection.onclose = function(e) {
        setTimeout(function() {
          connect();
        }, 1000);
      };
      wsConnection.onerror = function(error) {
      };
    }
    console.log(data);
    connect();
  }, [url,data]);

    return (
        <Layout
        title="Mínar Pantanir"
        footer={
            <Footer></Footer>
        }
        >
            <section>
              <div>Staða Pöntunar: {data.order.current_status}</div>
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