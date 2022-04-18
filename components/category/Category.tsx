import Link from 'next/link';
import s from './Category.module.scss';

type Props = {
  title: string,
  created: string,
  updated: string,
}

// TODO: bæta við í körfu.
export default function Category({title, created, updated}:Props):JSX.Element {

    return (
        <section className={s.category}>
          <h2 className={s.category}>{title}</h2>
          <p className={s.info}>{created}</p>
          <p className={s.info}>{updated}</p>
        </section>
      )
}