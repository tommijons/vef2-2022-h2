import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import Category from "../../components/category/Category";
import { Footer } from "../../components/footer/Footer";
import { Layout } from "../../components/layout/Layout";
import PagingCategory from "../../components/paging/PagingCategory";
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
      }  
      setLoading(false);
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
    title='Flokkar'
    footer={<Footer></Footer>}
    >
      <Category items={items} token={token}></Category>
      <PagingCategory paging={data}></PagingCategory>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let off = '';
  if(query.offset) {
    off = `offset=${query.offset}`;
  }
  let lim = '';
  if(query.limit) {
    lim = `limit=${query.limit}`;
  }

  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories?${off}&${lim}`);
  const data = await result.json();

  return {
    props: { data },
  }
}