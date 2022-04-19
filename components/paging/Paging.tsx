import { getPageFiles } from 'next/dist/server/get-page-files';
import { PagingProps, ProductsProps } from '../../pages/api/types';
import { getPage } from '../../pages/api/utils';
import s from './Paging.module.scss';


export default function Paging({paging}:{paging:PagingProps}):JSX.Element {
    const limit = (paging.limits) ? paging.limits : paging.limit
    let page;

    if (limit)
    page = getPage(limit, paging.offset)

    if (limit)
    return (
        <section className={s.paging}>
            <div className={s.paging__pages}>
                <p>Síða {page}</p>
            </div>
        </section>
    )

    return ( <p> engar síður </p>)
}
