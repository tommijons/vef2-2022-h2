import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Layout } from '../components/layout/Layout';
import Paging from '../components/paging/Paging';
import { Products } from '../components/products/Products';
import { Restaurant } from '../api/globals';
import { useRouter } from 'next/router';
import { Footer } from '../components/footer/Footer';

export default function Menu({
  data,
  query,
  catData
}:  InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { items: menuItems } = data;
  const router = useRouter();
  let stuff

  return (
    <Layout title={Restaurant.name} footer={<Footer></Footer>}>
      <Head>
        <title>Matseðill</title>
      </Head>
      <Products title='Matseðill' products={menuItems} query={query} categories={catData}/>
      <Paging paging={data} query={query} />
    </Layout>
  );
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
  let search = '';
  if(query.search) {
    search = `search=${query.search}`;
  }
  let cat = ''
  if(query.category) {
    cat = `category=${query.category}`;
  }

  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/menu?${off}&${lim}&${search}&${cat}`);
  const data = await result.json();

  const catResult = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories`);
  const catData = await catResult.json();

  return {
    props: { 
      data,
      query,
      catData
     },
  }
}
