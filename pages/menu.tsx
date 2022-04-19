import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import Paging from '../components/paging/Paging';
import { Products } from '../components/products/Products';
import { Restaurant } from './api/globals';

export default function Menu({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { items: menuItems } = data;

  return (
    <Layout title={Restaurant.name} footer={<div></div>}>
      <Head>
        <title>Matseðill</title>
      </Head>
      <Products title='Matseðill' products={menuItems} />
      <Paging paging={data} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = await fetch(`${Restaurant.url}/menu/`);
  const data = await result.json();

  return {
    props: { data },
  };
};
