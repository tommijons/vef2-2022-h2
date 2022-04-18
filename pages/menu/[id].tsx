import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Layout } from "../../components/layout/Layout";
import Product from "../../components/product/Product";
import { HerokuUrl } from "../api/globals";

export default function ProductPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>):JSX.Element {

    return(
        <Layout
        title="RFC"
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
    console.log('data :>> ', data);
    return {
        props: {
            data
        },
    };
}