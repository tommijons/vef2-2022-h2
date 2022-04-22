import { useCartContext } from '../../context/cartContext';
import { useUserContext } from '../../context/userContext';
import Header from '../header/Header';

import s from './Layout.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function Layout({ title, children, footer }: Props): JSX.Element {
  const cartContext = useCartContext();
  const loginContext = useUserContext();

  let page = 'admin/menu';

  if (!loginContext.login.login) {
    page = 'menu'
  }

  return (
    <div className={s.layout}>
      <Header loginContext={loginContext} cartContext={cartContext} title={title} page={page}></Header>
      <main>{children}</main>
      <footer className={s.layout__footer}>{footer}</footer>
    </div>
  );
}
