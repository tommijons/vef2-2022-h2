import { breytaHandlerCategory, eydaHandlerCategory } from "../../api/handlers";
import { CategoriesProps, InnerCategoryProps } from "../../api/types";
import s from "./Category.module.scss"

export default function Category({
  items,
  token
}:{
  items: InnerCategoryProps[],
  token: string,
  }):JSX.Element {

    function categoryMessage() {
      alert('Flokk bætt við!');
    }
  return (
    <section className={s.categories}>
      <h2 className={s.categories__title}>Flokkar</h2>
      <hr className={s.categories__menuLine}></hr>
      <ul className={s.categories__list}>
      {items.map((cat: { id: number; title: String }, i: number) => {
        return (
          <li className={s.categories__category} key={i}>
            <h4 key={i}>{cat.title}</h4>
            <button className={s.categories__button}
              onClick={async (event: any) => {
                eydaHandlerCategory(cat.id, token);
              }}
            >
              Eyða
            </button>
            <form
              onSubmit={async (event: any) => {
                event.preventDefault();
                const title = event.target.title.value;
                await breytaHandlerCategory(cat.id, title, token);
              }}
            >
              <label htmlFor='title'>Heiti:</label>
              <br />
              <input type='text' id='title'></input>
              <br />
              <button type='submit'>Breyta</button>
            </form>
          </li>
        );
      })}
      </ul>
      <hr className={s.categories__menuLine}></hr>
      <form className={s.categories__form}
        onSubmit={async (event: any) => {
          event.preventDefault();
          const title = event.target.title.value;
          const res = await fetch(
            'https://vef2-2022-h1-synilausn.herokuapp.com/categories',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ title }),
            }
          );
          categoryMessage();
        }}
      >
        <label htmlFor='title'>Nýr flokkur:</label>
        <br />
        <input type='text' id='title'></input>
        <br />
        <button type='submit'>Búa til</button>
      </form>
    </section>
  );
}