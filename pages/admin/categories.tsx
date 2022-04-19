import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import { Footer } from "../../components/footer/Footer";
import { Layout } from "../../components/layout/Layout";
import { useUserContext } from "../../context/userContext";

export default function Categories({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const loginContext = useUserContext();
  const { items } = data;

  useEffect(() => {
    const checkLogin = async () => {
      const user = await loginContext.login.user;
      if(user !== undefined){
        setToken(user.token)
        setLoading(false);
      }  
    }
    checkLogin();
  }, [loginContext])

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

  return (
    <Layout 
    title='Flokkar'
    footer={<Footer></Footer>}
    >
      {items.map((cat: { id: number, title: String}, i: number) => {
        return (
          <div key={i}>
            <p key={i}>{cat.title}</p>
            <button onClick={async (event:any) => {eydaHandler(cat.id, token)}}>eyða</button>
            <form onSubmit={ async (event:any) => {
              event.preventDefault();
              const title = event.target.title.value;
              await breytaHandler(cat.id, title, token);
            }}>
              <label htmlFor='title'>Heiti:</label><br/>
              <input type='text' id='title'></input><br/>
              <button type='submit'>Breyta</button>
            </form>
          </div>
        )
      })}
      <form onSubmit={ async (event:any) => {
        event.preventDefault();
        const title = event.target.title.value;
        const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
          body: JSON.stringify({ title }),
        })
      }}>
        <label htmlFor='title'>Nýr flokkur:</label><br/>
        <input type='text' id='title'></input><br/>
        <button type='submit'>Búa til</button>
      </form>
    </Layout>
  )
}

const eydaHandler = async ( id:number, token:String ) => {
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
      },
  })

  if(result.status === 401) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

const breytaHandler = async ( id: number, title: String, token: String ) => {
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
      },
    body: JSON.stringify({ title }),
  })
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const data = await result.json();

  return {
    props: { data },
  }
}