/* eslint-disable @next/next/link-passhref */
import Image from "next/image";
import Link from "next/link";
import s from "../layout/Layout.module.scss"
import basket from '../../public/shopping-cart.png';

export default function Header({loginContext, cartContext, title, page}:{loginContext: any, cartContext: any, title: string, page: string}):JSX.Element {
    return (
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
            {loginContext.login.login ? (
              <li className={s.layout__listItem}>
                <Link href={`/admin/categories`}>Flokkar</Link>
              </li> ) : ( <></> )
            }
            {loginContext.login.login ? (
              <li className={s.layout__listItem}>
                <Link href={`/admin/orders`}>Pantanir</Link>
              </li> ) : ( <></> )
            }
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
    )
}