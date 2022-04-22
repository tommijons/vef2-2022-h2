export type CategoryProps = {
  id: number,
  title: string,
  created: string,
  updated: string
}

export type CategoriesProps = {
  limit: number,
  offset: number,
  items: InnerCategoryProps[],
  _links: {
    self: {
      href: string,
    }
  }
}

export type InnerCategoryProps = {
  id: number,
  title: string
}


export type ProductsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: number;
  price: number;
  created: string;
  updated: string;
};

export type CartProductsProps = {
  id: number;
  image: string;
  title: string;
  description: string;
  category: CategoryProps;
  price: number;
  quantity: number;
  total: number;
  created: string;
  updated: string;
};

export type PagingProps = {
  limits: number;
  offset: number;
  items?: ProductsProps[];
  _links: LinksProps;
};

export type PagingCategoryProps = {
  limits: number;
  offset: number;
  items?: InnerCategoryProps[];
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
