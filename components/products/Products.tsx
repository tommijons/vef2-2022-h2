import Link from 'next/link';
import { CategoriesProps, ProductsProps } from '../../api/types';
import s from './Products.module.scss';
import basket from '../../public/shopping-cart.png';
import Image from 'next/image';
import Cart from '../cart/Cart';
import Search from '../search/Search';
import { ParsedUrlQuery } from 'querystring';

// TODO: bæta við í körfu.
export function Products({
  title,
  products,
  query,
  categories
}: {
  title: string;
  products: ProductsProps[];
  query: ParsedUrlQuery;
  categories: CategoriesProps;
}): JSX.Element {
  return (
    <section className={s.products}>
      <h2 className={s.products__title}>{title}</h2>
      <hr className={s.products__menuLine}></hr>
      <Search query={query} categories={categories}></Search>
      <ul className={s.products__list}>
        {products.map((item, i) => {
          return (
            <li className={s.products__product} key={i}>
              <Link href={`/menu/${item.id}`}>
                <div className={s.products__productImage}>
                  {item.image && (
                    <img
                      className={s.products__productImg}
                      src={item.image}
                      alt={`Mynd af ${item.title}`}
                    />
                  )}
                </div>
              </Link>
              <div className={s.products__productContent}>
                <div className={s.products__productText}>
                  <h3 className={s.products__productTitle}>
                    <Link href={`/menu/${item.id}`}>{item.title}</Link>
                  </h3>
                </div>
                <hr className={s.products__line}></hr>
                <div className={s.products__productLower}>
                  <p className={s.products__productPrice}>{item.price} kr.-</p>
                  <div className={s.products__productToBasket}>
                    <Cart product={item.id} quantity={1}></Cart>
                    <div className={s.products__productBasket}>
                      <Image src={basket} alt={'karfa'} layout='fill' />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
