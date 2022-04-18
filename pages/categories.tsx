import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { Layout } from "../components/layout/Layout"
import { Categories } from "../components/categories/Categories";
import { HerokuUrl, RestaurantName } from "./api/globals";

export default function Menu({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const categories = data; 
    return(
        <Layout
            title={RestaurantName}
            footer={
                <div></div>
            }
        >
            <Head>
                <title>Vöruflokkar</title>
            </Head>
            <Categories title="Vöruflokkar" categories={categories} />
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const result = await fetch(`${HerokuUrl}/categories`);  
    const data = await result.json();
  
    return {
      props: { data }
    };
  }