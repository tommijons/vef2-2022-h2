import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Layout } from '../../components/layout/Layout';
import Product from '../../components/product/Product';
import { Restaurant } from '../api/globals';

export default function ProductPage({
  data,
  cat
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout title={Restaurant.name} footer={<div></div>}>
      <Product product={data} category={cat}/>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await fetch(`${Restaurant.url}/menu/${params?.id}`);
  const data = await result.json();

  const categories = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${data.category}`);
  const cat = await categories.json();

  return {
    props: {
      data,
      cat,
    },
  };
};
