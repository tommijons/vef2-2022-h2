import Link from 'next/link';
import { PagingCategoryProps, PagingProps, ProductsProps } from '../../api/types';
import { getPage } from '../../api/utils';
import s from './Paging.module.scss';


export default function PagingCategory({paging}:{paging: PagingCategoryProps}):JSX.Element {
    return (
      <section className={s.paging}>
        <hr className={s.paging__menuLine}></hr>
        <div className={s.paging__pages}>
          <h4>Síða {getPage(10, paging.offset)}</h4>
          <div className={s.paging__change}>
            {paging._links && paging._links.prev ? (
              <Link href={`/admin/categories?offset=${paging.offset - 10}&limit=10`}>
                Fyrri
              </Link>
            ) : (
              <></>
            )}
            {paging._links && paging._links.next ? (
              <Link href={`/admin/categories?offset=${paging.offset + 10}&limit=10`}>
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
