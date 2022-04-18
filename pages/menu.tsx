import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout"
import { Products } from "../components/products/Products";

export default function Menu({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const {items:menuItems } = data;
    return(
        <Layout
            title="RFC"
            footer={
                <div></div>
            }
        >
            <Head>
                <title>Matseðill</title>
            </Head>
            <Products title="Matseðill" products={menuItems} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const result = await fetch(`https://vef2h1-rfc.herokuapp.com/menu`);  
    const data = await result.json();
  
    return {
      props: { data }
    };
  }
  