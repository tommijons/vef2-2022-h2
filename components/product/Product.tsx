import Link from 'next/link';
import s from './Product.module.scss';

type CategoryProps = {
    id:number;
    title:string;
}
type Props = {
    image:string;
    title:string;
    description:string;
    category:CategoryProps;
    price:number;
}

// TODO: Bæta við í körfu.
export default function Product({ image, title, category, description, price}:Props):JSX.Element {

    return (
        <section className={s.product}>
            <h2 className={s.product__title}>{title}</h2>
            <p className={s.product__category}>{category.title}</p>
            <div className={s.product__image}>
                {image && (
                    <img className={s.product__img} src={image} alt={`Mynd af ${title}`} />
                    )}
            </div>
            <p className={s.product__description}>{description}</p>
            <p className={s.product__price}>{price} kr.</p>
            <p><Link href="/menu">Til baka</Link></p>
        </section>
    )
}