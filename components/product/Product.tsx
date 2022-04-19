import Image from 'next/image';
import Link from 'next/link';
import { ProductsProps } from '../../pages/api/types';
import s from './Product.module.scss';
import basket from '../../public/shopping-cart.png';

// TODO: Bæta við í körfu.
export default function Product({
  product,
}: {
  product: ProductsProps;
}): JSX.Element {
  return (
    <section className={s.product}>
      <h2 className={s.product__title}>{product.title}</h2>
      <hr className={s.product__dividerLine}></hr>
      <p className={s.product__category}>{product.category.title}</p>
      <div className={s.product__product}>
        <div className={s.product__text}>
          <p className={s.product__description}>{product.description}</p>
        </div>
        <div className={s.product__right}>
        <div className={s.product__image}>
          {product.image && (
            <img
              className={s.product__img}
              src={product.image}
              alt={`Mynd af ${product.title}`}
            />
          )}
        </div>
        <div className={s.product__lower}>
            <p className={s.product__price}>Verð: {product.price} kr.</p>
            <div className={s.product__productToBasket}>
              <p className={s.product__productAdd}>Bæta í körfu</p>
              <div className={s.product__productBasket}>
                <Image src={basket} alt={'karfa'} layout='fill' />
              </div>
            </div>
          </div>
        
        </div>
      </div>
    </section>
  );
}
