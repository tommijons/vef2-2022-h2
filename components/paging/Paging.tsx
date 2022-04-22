import Link from 'next/link';
import { useUserContext } from '../../context/userContext';
import { PagingProps } from '../../api/types';
import { getPage } from '../../api/utils';
import s from './Paging.module.scss';
import { ParsedUrlQuery } from 'querystring';


export default function Paging({
  paging,
  query
}: {
  paging: PagingProps,
  query: ParsedUrlQuery
}): JSX.Element {
  const loginContext = useUserContext();

  let page = 'admin/menu';

  if (!loginContext.login.login) {
    page = 'menu';
  }
  return (
    <section className={s.paging}>
      <hr className={s.paging__menuLine}></hr>
      <div className={s.paging__pages}>
        <h4>Síða {getPage(10, paging.offset)}</h4>
        <div className={s.paging__change}>
          {paging._links && paging._links.prev ? (
            <Link href={`/${page}?offset=${paging.offset - 10}&limit=10&search=${query.search || ''}&category=${query.category || ''}`}>
              Fyrri
            </Link>
          ) : (
            <></>
          )}
          {paging._links && paging._links.next ? (
            <Link href={`/${page}?offset=${paging.offset + 10}&limit=10&search=${query.search || ''}&category=${query.category || ''}`}>
              Næsta
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
