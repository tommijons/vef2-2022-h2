import Link from 'next/link';
import { ProductsProps } from '../../pages/api/types';
import s from './Products.module.scss';

// TODO: bæta við í körfu.
export function Products({title, products}:{title:string, products:ProductsProps[]}):JSX.Element {

    return (
        <section className={s.products}>
          <h2 className={s.products__title}>{title}</h2>
          <ul className={s.products__list}>
            {products.map((item, i) => {
              return (
                <li className={s.products__product} key={i}>
                    <div className={s.products__productImage}>
                    {item.image && (
                        <img className={s.products__productImg} src={item.image} alt={`Mynd af ${item.title}`} />
                        )}
                    </div>
                    <div className={s.products__productContent}>
                        <div className={s.products__productText}>
                            <h3 className={s.products__productTitle}><Link href={`/menu/${item.id}`} >{item.title}</Link></h3>
                        </div>
                            <p className={s.products__productPrice}>{item.price} kr.-</p>
                    </div>
                </li>
              )
            })}
          </ul>
        </section>
      )
}