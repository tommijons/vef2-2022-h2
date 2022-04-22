import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Footer } from "../../../components/footer/Footer";
import { Layout } from "../../../components/layout/Layout";
import Product from "../../../components/product/Product";
import { useUserContext } from "../../../context/userContext";

export default function Order({ uid }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const loginContext = useUserContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ id: '', lines: [], current_status: ''});
  const [notfound, setNotfound] = useState(false);

  useEffect(() => {
    const getData = async () => {
      if(loginContext.login.user !== undefined && loginContext.login.login){
        const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}`, {
          headers: {
            'Authorization': `Bearer ${loginContext.login.user.token}`
          },
        });
        if(result.status === 404) {
          setNotfound(true);
        } else {
          const res = await result.json();
          if(res.error !== undefined) {
            await loginContext.logOut();
          } else {
            setData(res);
            setLoading(false);
          }
        } 
      } else {
        setLoading(true);
        if(loginContext.login.user !== undefined && !loginContext.login.login) {
          setLoading(false);
        }
      }
    }
    getData();
  }, [loginContext,uid])


  if(notfound) {
    return (
      <p>404</p>
    )
  }

  if(loading) {
    return (
      <Layout
      title='Order'
      footer={<Footer></Footer>}
      >
        <p>loading...</p>
      </Layout>
    )
  }

  if(!loginContext.login.login) {
    return (
      <>
        <h1>401 access denied</h1>
        <Link href='/'>Forsíða</Link>
      </>
    )
  }

  return (
    <Layout
    title='Order'
    footer={<Footer></Footer>}
    >
      <p>{data.id}</p>
      <p>{data.current_status}</p>
      {data.lines.map((product: { title: string, quantity: number },i) => {
        return (
          <div key={i}>
            <p>{product.title}</p>
            <p>Fjöldi: {product.quantity}</p>
          </div>
        )
      })}
      <button onClick={async (event: any) => {
        event.preventDefault();
        let status = 'FINISHED'
        if(data.current_status === 'NEW') {
          status = 'PREPARE';
        } else if(data.current_status === 'PREPARE') {
          status = 'COOKING';
        } else if(data.current_status === 'COOKING') {
          status = 'READY'
        }
        const res = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/orders/${uid}/status`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${loginContext.login.user.token}`
          },
          body: JSON.stringify({ status }),
        });
        Router.reload();
      }}>
        Næsta staða
      </button>
    </Layout>
  )
}

export const getServerSideProps = async ({ params }: { params: { uid: string }}) => {
  const uid = params.uid;

  return {
    props: { uid },
  }
}