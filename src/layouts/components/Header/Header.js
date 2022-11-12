import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '~/config';
import { useContext, useEffect } from 'react';
import { faSignOut, faUser, faStore, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import { AuthContext } from '~/contexts/AuthContext';
import CartMenu from '../CartMenu';
import { CartContext } from '~/contexts/CartContext';
import Toast from '~/components/Toast';

const cx = classNames.bind(styles);

function Header() {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    logoutUser,
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  const {
    cartState: { cart },
    getAllCart,
  } = useContext(CartContext);

  useEffect(() => {
    if (user) getAllCart(user.username);

    // eslint-disable-next-line
  }, [user]);

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Tài khoản',
      to: config.routes.profile,
    },
    {
      icon: <FontAwesomeIcon icon={faStore} />,
      title: 'Đơn hàng',
      to: config.routes.purchase,
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Đăng xuất',
      separate: true,
    },
  ];

  const handleMenuOnchange = (menuItem) => {
    if (menuItem.title === 'Đăng xuất') {
      logoutUser();
    }
  };

  return (
    <div className={cx('main')}>
      <Toast />
      <div className={cx('wrapper', ['grid', 'wide'])}>
        <div className={cx('inner')}>
          <div className={cx('logo-wrapper')}>
            <Link className={cx('logo')} to={config.routes.home}>
              <img src={images.logo} alt="logo" className={cx('logo-img')}></img>
            </Link>
          </div>

          <Search />

          {width > 740 ? (
            <div className={cx('actions')}>
              <div className={cx('cart')}>
                {isAuthenticated && width > 740 ? (
                  <CartMenu offset={[20, 8]} data={cart}>
                    <div className={cx('cart-icon')}>
                      {cart && cart.products.length > 0 ? (
                        <div className={cx('cart-amount')}>
                          <span>{cart && cart.products.length}</span>
                        </div>
                      ) : (
                        ''
                      )}
                      <Link to={config.routes.cart}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCartPlus}></FontAwesomeIcon>
                      </Link>
                    </div>
                  </CartMenu>
                ) : isAuthenticated && width < 740 ? (
                  <Fragment></Fragment>
                ) : (
                  <Link to={config.routes.login} className={cx('link-login')}>
                    Log in
                  </Link>
                )}
              </div>

              {isAuthenticated && (
                <Menu items={userMenu} onChange={handleMenuOnchange} offset={[20, 8]}>
                  <div className={cx('user-content')}>
                    <img
                      src={user && user.img ? user.img : images.logo}
                      className={cx('user-avatar')}
                      alt={user.fullName || user.username}
                    ></img>
                    <p className={cx('user-name')}>{user.fullName || user.username}</p>
                  </div>
                </Menu>
              )}
            </div>
          ) : (
            <div className={cx('actions-mobile')}>
              <div className={cx('cart')}>
                {isAuthenticated && width > 740 ? (
                  <CartMenu offset={[20, 8]} data={cart}>
                    <div className={cx('cart-icon')}>
                      {cart && cart.products.length > 0 ? (
                        <div className={cx('cart-amount')}>
                          <span>{cart && cart.products.length}</span>
                        </div>
                      ) : (
                        ''
                      )}
                      <Link to={config.routes.cart}>
                        <FontAwesomeIcon className={cx('icon')} icon={faCartPlus}></FontAwesomeIcon>
                      </Link>
                    </div>
                  </CartMenu>
                ) : isAuthenticated && width < 740 ? (
                  <Fragment></Fragment>
                ) : (
                  <Link to={config.routes.login} className={cx('link-login')}>
                    Log in
                  </Link>
                )}
              </div>

              {isAuthenticated && (
                <Menu items={userMenu} onChange={handleMenuOnchange} offset={[20, 8]}>
                  <div className={cx('user-content', 'mobile')}>
                    <img
                      src={user && user.img && user.img !== '' ? user.img : images.logo}
                      className={cx('user-avatar-mobile')}
                      alt={user.fullName || user.username}
                    ></img>
                    <p className={cx('user-name-mobile')}>{user.fullName || user.username}</p>
                  </div>
                </Menu>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
