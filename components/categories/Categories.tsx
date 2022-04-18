import Link from 'next/link';
import s from './Categories.module.scss';

type Props = {
  limits: number,
  offset: number,
  items: CategoryItems[],
  _links: {
    self: {
      href: string,
    }
  }
}

type CategoryItems = {
  id: number,
  title: string,
}

// TODO: bæta við í körfu.
export function Categories({title, categories}:{title:string, categories:Props}):JSX.Element {

    return (
        <section className={s.categories}>
          <h2 className={s.categories}>{title}</h2>
          <ul className={s.categories__list}>
            {categories.items.map((item, i) => {
              return (
                <li className={s.categories__category} key={i}>
                    <Link href={`/categories/${item.id}`}>{item.title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
      )
}