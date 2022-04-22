import { GetServerSideProps } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Layout } from "../../components/layout/Layout";
import { useUserContext } from "../../context/userContext";

export default function Orders() {
  const loginContext = useUserContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ items: []});

  useEffect(() => {
    const getData = async () => {
      if(loginContext.login.user !== undefined && loginContext.login.login){
        const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/orders`, {
          headers: {
            'Authorization': `Bearer ${loginContext.login.user.token}`
          },
        });
        const res = await result.json();
        if(res.errors !== undefined) {
          loginContext.logOut;
        }
        setData(res);
        setLoading(false);
      } else {
        setLoading(true);
        if(loginContext.login.user !== undefined && !loginContext.login.login) {
          setLoading(false);
        }
      }
    }
    getData();
  }, [loginContext])

  if(loading) {
    return (
      <Layout
      title='Orders'
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
    title='Orders'
    footer={<Footer></Footer>}
    >
      {data.items.map((order: { id: string, current_state: string}, i) => {
        return (
          <div key={i}>
            <Link href={`/admin/orders/${order.id}`}>{order.id}</Link>
            <p>{order.current_state}</p>
          </div>
        )
      })}
    </Layout>
  )
}