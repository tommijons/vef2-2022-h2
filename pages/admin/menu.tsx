import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer/Footer";
import { Layout } from "../../components/layout/Layout";
import { useUserContext } from "../../context/userContext";
import { ProductsProps } from "../api/types";

export default function Menu({ data }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
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
    <Layout
    title='Menu'
    footer={<Footer></Footer>}
    >
      {items.map((prod: ProductsProps, i: number) => {
        return (
          <div key={i}>
            <div>
              {prod.image && (
                <img
                  src={prod.image}
                  alt={`Mynd af ${prod.title}`}
                />
              )}
            </div>
            <div>
              <h3>
                <p>{prod.title}</p>
              </h3>
              <p>{prod.description}</p>
              <p>{prod.price} kr.-</p>
            </div>
            <button onClick={async (event:any) => {eydaHandler(prod.id, token)}}>eyða</button>
            <form onSubmit={ async (event:any) => {
              event.preventDefault();
              const title = event.target.title.value;
              const price = event.target.price.value;
              const description = event.target.description.value;
              const category = event.target.category.value;
              const image = event.target.image.files[0];
              console.log(image);
              console.log(event.target.image.files);
              await breytaHandler(prod.id, title, price, description, category, image, token);
            }}>
              <label htmlFor='title'>Titill:</label><br/>
              <input type='text' id='title'></input><br/>
              <label htmlFor='price'>Verð:</label><br/>
              <input type='number' id='price'></input><br/>
              <label htmlFor='description'>Lýsing:</label><br/>
              <input type='text' id='description'></input><br/>
              <label htmlFor='category'>Númer flokks:</label><br/>
              <input type='number' id='category' min={1}></input><br/>
              <label htmlFor='imgae'>Mynd:</label><br/>
              <input type='file' id='image'></input><br/>
              <button type='submit'>Breyta</button>
            </form>
          </div>
        )
      })}
      <form onSubmit={ async (event:any) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('title', event.target.title.value);
            formData.append('price', event.target.price.value);
            formData.append('description', event.target.description.value);
            formData.append('category', event.target.category.value);
            formData.append('image', event.target.image.files[0]);
            const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/menu', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
                },
              body: formData,
            })
          }}>
            <label htmlFor='title'>Titill:</label><br/>
            <input type='text' id='title'></input><br/>
            <label htmlFor='price'>Verð:</label><br/>
            <input type='number' id='price'></input><br/>
            <label htmlFor='description'>Lýsing:</label><br/>
            <input type='text' id='description'></input><br/>
            <label htmlFor='category'>Númer flokks:</label><br/>
            <input type='number' id='category' min={1}></input><br/>
            <label htmlFor='imgae'>Mynd:</label><br/>
            <input type='file' id='image'></input><br/>
            <button type='submit'>Ný vara</button>
          </form>
          {data._links &&  data._links.prev ? ( <Link href={`/admin/menu?offset=${offset-10}&limit=10`}>Fyrri</Link> ): <></> }
          {data._links &&  data._links.next ? ( <Link href={`/admin/menu?offset=${offset+10}&limit=10`}>Næsta</Link> ): <></> }
    </Layout>
  )
}

const eydaHandler = async ( id:number, token:String ) => {
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/menu/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
      },
  })

  if(result.status === 401) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

const breytaHandler = async ( id: number, title: string, price: string, description: string, category: string, image: any, token: String ) => {
  const formData = new FormData();
  if(title) formData.append('title', title);
  if(price) formData.append('price', price);
  if(description) formData.append('description', description);
  if(category) formData.append('category', category);
  if(image !== undefined) {
    formData.append('image', image);
  }
  console.log(formData);
  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/menu/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      },
    body: formData,
  })
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

  const result = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/menu?${off}&${lim}`);
  const data = await result.json();

  return {
    props: { data },
  }
}