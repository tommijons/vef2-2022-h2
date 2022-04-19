import Link from 'next/link';
import { ProductsProps } from '../../pages/api/types';
import s from './Product.module.scss';

// TODO: Bæta við í körfu.
export default function Product({product}:{product:ProductsProps}):JSX.Element {
    return (
        <section className={s.product}>
            <h2 className={s.product__title}>{product.title}</h2>
            <p className={s.product__category}>{product.category.title}</p>
            <div className={s.product__image}>
                {product.image && (
                    <img className={s.product__img} src={product.image} alt={`Mynd af ${product.title}`} />
                    )}
            </div>
            <p className={s.product__description}>{product.description}</p>
            <p className={s.product__price}>{product.price} kr.</p>
            <p><Link href="/menu">Til baka</Link></p>
        </section>
    )
}