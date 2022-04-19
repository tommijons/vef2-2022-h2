import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Layout } from '../../components/layout/Layout';
import Product from '../../components/product/Product';
import { Restaurant } from '../api/globals';

export default function ProductPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout title={Restaurant.name} footer={<div></div>}>
      <Product product={data} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const result = await fetch(`${Restaurant.url}/menu/${params?.id}`);
  const data = await result.json();
  return {
    props: {
      data,
    },
  };
};
