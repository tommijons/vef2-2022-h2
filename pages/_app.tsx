import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper } from '../context/userContext'
import { CartWrapper } from '../context/cartContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <CartWrapper>
        <Component {...pageProps} />
      </CartWrapper>
    </AppWrapper>
  )
}

export default MyApp
