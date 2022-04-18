import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "../../components/layout/Layout";
import Product from "../../components/product/Product";
import { HerokuUrl, RestaurantName } from "../api/globals";

export default function ProductPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>):JSX.Element {

    return(
        <Layout
        title={RestaurantName}
        footer={
            <div></div>
        }
        >
            <Product
            image={data.image}
            title={data.title}
            description={data.description}
            category={data.category}
            price={data.price}
            />
                
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const result = await fetch(`${HerokuUrl}/menu/${params?.id}`);  
    const data = await result.json();
    return {
        props: {
            data
        },
    };
}