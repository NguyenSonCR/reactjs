const routes = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',

  profile: '/user/profile',

  products: '/products',
  showProduct: '/products/:slug',
  delete: '/products/:slug/delete',
  search: '/search',

  posts: '/posts',
  showPost: '/posts/:slug',

  cart: '/user/cart',
  checkout: '/user/checkout',
  purchase: '/user/purchase',

  category: '/category/:slug',
  categories: '/categores',

  notFound: '*',
};
export default routes;
