import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { CategoriesProps, CategoryProps } from '../../api/types';
import s from './Search.module.scss';

export default function Search({
  query,
  categories,
}: {
  query: ParsedUrlQuery;
  categories: CategoriesProps;
}): JSX.Element {
  const router = useRouter();
  const { items } = categories;

  return (
    <section className={s.search}>
      <div className={s.search__category}>
        <h5>Flokkur</h5>
        <select
          name='category'
          onChange={(event: any) => {
            event.preventDefault();
            let categ = items.find(
              (element) => element.title === event.target.value
            );

            if (categ === undefined) {
              router.push(
                `menu?offset=${query.offset || 0}&limit=10&search=${
                  query.search || ''
                }&category=`
              );
            } else {
              router.push(
                `menu?offset=${query.offset || 0}&limit=10&search=${
                  query.search || ''
                }&category=${categ.id}`
              );
            }
          }}
        >
          <option value=''>Allir</option>
          {items.map((item, i) => {
            return (
              <option key={i} value={item.title}>
                {item.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className={s.search__search}>
        <h5>Leita</h5>
        <input
          name='search'
          onChange={(event: any) => {
            event.preventDefault();
            router.push(
              `menu?offset=${query.offset || 0}&limit=10&search=${
                event.target.value
              }&category=${query.category || ''}`
            );
          }}
        ></input>
      </div>
    </section>
  );
}
