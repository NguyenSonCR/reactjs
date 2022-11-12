import config from '~/config';
import { HeaderOnly } from '~/layouts';
import Products from '~/pages/Products';
import Profile from '~/pages/Profile';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Home from '~/pages/Home';
import NotFound from '~/components/NotFound';
import ProductDetail from '~/pages/ProductDetail';
import Posts from '~/pages/Posts';
import PostDetail from '~/pages/PostDetail';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';
import Purchase from '~/pages/Purchase';
import Category from '~/pages/Category';
import Categories from '~/pages/Categories';

const privateRoutes = [
  { path: config.routes.profile, component: Profile },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.purchase, component: Purchase, layout: HeaderOnly },
];

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.products, component: Products },
  { path: config.routes.showProduct, component: ProductDetail },

  { path: config.routes.search, component: Search, layout: HeaderOnly },

  { path: config.routes.posts, component: Posts },
  { path: config.routes.showPost, component: PostDetail },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
  { path: config.routes.notFound, component: NotFound, layout: null },

  { path: config.routes.category, component: Category, layout: HeaderOnly },
  { path: config.routes.categories, component: Categories },
];
export { privateRoutes, publicRoutes };
