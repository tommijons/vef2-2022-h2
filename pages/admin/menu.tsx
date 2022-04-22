import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Layout } from "../../components/layout/Layout";
import { ProductsAdmin } from "../../components/products/ProductsAdmin";
import { useUserContext } from "../../context/userContext";
import { ProductsProps } from "../../api/types";
import s from '../../components/products/Products.module.scss';
import { getPage } from "../../api/utils";
import Paging from "../../components/paging/Paging";
import Search from "../../components/search/Search";


export default function Menu({ data, query, catData }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const loginContext = useUserContext();
  const { items } = data;

  let offset = data.offset;

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
    <Layout title='Menu' footer={<Footer></Footer>}>
      <section className={s.products}>
        <h2 className={s.products__title}>Matseðill - Stjórnendur</h2>
        <hr className={s.products__menuLine}></hr>
        <Search query={query} categories={catData}></Search>
        <ul className={s.products__list}>
          {items.map((prod: ProductsProps, i: number) => {
            return <ProductsAdmin prod={prod} key={i} token={token} />;
          })}
        </ul>
      </section>

      <hr className={s.products__menuLine}></hr>
      <h2 className={s.products__title}>Ný vara</h2>
      <div className={s.products__admin}>
        <form
          className={s.products__new}
          onSubmit={async (event: any) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('title', event.target.title.value);
            formData.append('price', event.target.price.value);
            formData.append('description', event.target.description.value);
            formData.append('category', event.target.category.value);
            formData.append('image', event.target.image.files[0]);
            const res = await fetch(
              'https://vef2-2022-h1-synilausn.herokuapp.com/menu',
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                body: formData,
              }
            );
          }}
        >
          <label htmlFor='title'>Titill:</label>
          <br />
          <input type='text' id='title'></input>
          <br />
          <label htmlFor='price'>Verð:</label>
          <br />
          <input type='number' id='price'></input>
          <br />
          <label htmlFor='description'>Lýsing:</label>
          <br />
          <input type='text' id='description'></input>
          <br />
          <label htmlFor='category'>Númer flokks:</label>
          <br />
          <input type='number' id='category' min={1}></input>
          <br />
          <label htmlFor='imgae'>Mynd:</label>
          <br />
          <input type='file' id='image'></input>
          <br />
          <button type='submit'>Ný vara</button>
        </form>
      </div>
      <div className='paging'>
        <Paging paging={data} query={query}></Paging>
      </div>
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
    props: { data, query, catData },
  }
}