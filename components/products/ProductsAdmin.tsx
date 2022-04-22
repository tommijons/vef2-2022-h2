/* eslint-disable @next/next/no-img-element */
import { breytaHandler, eydaHandler } from "../../api/handlers";
import { ProductsProps } from "../../api/types";
import s from './Products.module.scss';

export function ProductsAdmin({
  prod,
  key,
  token,
}: {
  prod: ProductsProps;
  key: number;
  token: string;
}): JSX.Element {
  return (
    <li className={s.products__product} key={key}>
      <div className={s.products__productImageAdmin}>
        {prod.image && (
          <img
            className={s.products__productImg}
            src={prod.image}
            alt={`Mynd af ${prod.title}`}
          />
        )}
      </div>
      <div className={s.products__productContent}>
        <div className={s.products__productText}>
          <h3 className={s.products__productTitle}>{prod.title}</h3>
        </div>
      </div>
      <hr className={s.products__line}></hr>
      <div className={s.products__productLowerAdmin}>
        <p>{prod.description}</p>
        <p className={s.products__productPriceAdmin}>{prod.price} kr.-</p>
      </div>
      <hr className={s.products__line}></hr>
      <div className={s.products__admin}>
        <form className={s.products__form}
          onSubmit={async (event: any) => {
            event.preventDefault();
            const title = event.target.title.value;
            const price = event.target.price.value;
            const description = event.target.description.value;
            const category = event.target.category.value;
            const image = event.target.image.files[0];
            await breytaHandler(
              prod.id,
              title,
              price,
              description,
              category,
              image,
              token
            );
          }}
        >
          <label htmlFor='title'>Titill:</label>
          <br />
          <input type='text' id='title'></input>
          <br />
          <label htmlFor='price'>Verð:</label>
          <br />
          <input type='number' id='price'></input>
          <br />
          <label htmlFor='description'>Lýsing:</label>
          <br />
          <input type='text' id='description'></input>
          <br />
          <label htmlFor='category'>Númer flokks:</label>
          <br />
          <input type='number' id='category' min={1}></input>
          <br />
          <label htmlFor='imgae'>Mynd:</label>
          <br />
          <input type='file' id='image'></input>
          <br />
          <button type='submit'>Breyta</button>
        </form>
        <button
          className={s.products__button}
          onClick={async (event: any) => {
            eydaHandler(prod.id, token);
          }}
        >
          Eyða
        </button>
      </div>
    </li>
  );
}
