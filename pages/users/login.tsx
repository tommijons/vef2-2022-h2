import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { useUserContext } from "../../context/userContext";

const loginHandler = async (event: any) =>{
  event.preventDefault();
  const username = event.target.username.value;
  const password = event.target.password.value;
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  const result = await res.json();

  return result;
}

export default function Login() {
  const loginContext = useUserContext();
  const [fail, setFail] = useState(false);

  return (
    <Layout
      title='RFC'
      footer={<div></div>}
    >
      <Head>
        <title>Innskráning</title>
      </Head>
      <h1>Innskráning</h1>
      <form onSubmit={async (event) => { 
        event.preventDefault();
        const user = await loginHandler(event);

        if(user.user !== undefined) {
          loginContext.state.setLogin({ login: true, user: user });
          localStorage.setItem("user", JSON.stringify({ login: true, user: user }));
          setFail(false);
          Router.push('/');
        } else {
          setFail(true);
        }
      }}>
        <label htmlFor='username'>Notendanafn:</label><br/>
        <input type='text' id='username'/><br/>
        <label htmlFor='password'>Lykilorð:</label><br/>
        <input type='password' id='password'/><br/>
        {
          fail ? <p>Invalid user/password</p> : <p></p>
        } 
        <button type="submit">Innskrá</button>
      </form>
    </Layout>
  )
}