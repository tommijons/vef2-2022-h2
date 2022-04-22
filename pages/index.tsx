import type { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../components/layout/Layout'
import { Footer } from '../components/footer/Footer'
import { Restaurant } from './api/globals'
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {

  return (
    <Layout 
    title={Restaurant.name}
    footer= {
      <Footer></Footer>
    }
    >
      <Head>
        <title>{Restaurant.name}</title>
      </Head>
      <div className={styles.container}>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </Layout>
  )
}

export default Home
