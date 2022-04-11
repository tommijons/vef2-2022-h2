import Link from 'next/link';

import s from './Layout.module.scss';

type Props = {
    title: string;
    children: React.ReactNode;
    footer: React.ReactNode;
};

export function Layout({ title, children, footer }: Props): JSX.Element {
  return (
    <div className={s.layout}>
      <header className={s.layout__header}>
        <h1>{title}</h1>
        <nav>
          <ul className={s.layout__list}>
            <li className={s.layout__listItem}><Link href="/menu">Matseðill</Link></li>
            <li className={s.layout__listItem}><Link href="/cart">Karfa</Link></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={s.layout__footer}>
        {footer}
      </footer>
    </div>
  );
}