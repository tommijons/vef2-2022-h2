import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import basket from '../../public/shopping-cart.png';

import s from './Layout.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function Layout({ title, children, footer }: Props): JSX.Element {
  const cartContext = useCartContext();
  const loginContext = useUserContext();

  let page = 'admin/menu';

  if (!loginContext.login.login) {
    page = 'menu'
  }

  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
        <nav>
          <ul className={s.layout__list}>
            <li className={s.layout__listItem}>
              <Link href='/'>Forsíða</Link>
            </li>
            <li className={s.layout__listItem}>
              <Link href={`/${page}`}>Matseðill</Link>
            </li>
            <li className={s.layout__listItem}>
              <Link href='/cart'>
                <div className={s.layout__cart}>
                  <Image src={basket} alt={'karfa'} layout='fill' />
                  <p className={s.layout__cartItems}>{cartContext.fjoldi}</p>
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={s.layout__footer}>{footer}</footer>
    </div>
  );
}
