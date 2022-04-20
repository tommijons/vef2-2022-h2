export type CategoryProps = {
  id: number;
  title: string;
};

export type ProductsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: CategoryProps;
  price: number;
  created: string;
  updated: string;
};

export type PagingProps = {
  limits?: number;
  limit?: number;
  offset: number;
  items: ProductsProps[];
  _links: LinksProps;
};

export type LinksProps = {
  self: {
    href: string;
  };
  prev?: {
    href: string;
  };
  next?: {
    href: string;
  };
};