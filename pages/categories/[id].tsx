import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "../../components/layout/Layout";
import Category from "../../components/category/Category";
import { HerokuUrl, RestaurantName } from "../api/globals";

export default function ProductPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>):JSX.Element {

    return(
        <Layout
        title={RestaurantName}
        footer={
            <div></div>
        }
        >
            <Category title={data.title} created={data.created} updated={data.updated} />
                
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const result = await fetch(`${HerokuUrl}/categories/${params?.id}`);  
    const data = await result.json();
    console.log('data :>> ', data);
    return {
        props: {
            data
        },
    };
}