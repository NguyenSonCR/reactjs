import { faCartPlus, faHome, faSignsPost, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import { AuthContext } from '~/contexts/AuthContext';
import { CartContext } from '~/contexts/CartContext';
import styles from './NaviMobi.module.scss';

const cx = classNames.bind(styles);
function NaviMobi() {
  const {
    cartState: { cart },
  } = useContext(CartContext);
  const {
    authState: { user, navigation },
    chooseNavigation,
  } = useContext(AuthContext);

  const handleClick = (data) => {
    chooseNavigation(data);
  };

  return (
    <div className={cx('nav-mobile')}>
      <div className={cx('wrapper')}>
        <Link to={config.routes.home} className={cx('list')} onClick={() => handleClick('home')}>
          <FontAwesomeIcon icon={faHome} className={cx('icon', navigation === 'home' && 'active')}></FontAwesomeIcon>
          <p className={cx('text')}>Trang chủ</p>
        </Link>

        <Link to={config.routes.posts} className={cx('list')} onClick={() => handleClick('post')}>
          <FontAwesomeIcon
            icon={faSignsPost}
            className={cx('icon', navigation === 'post' && 'active')}
          ></FontAwesomeIcon>
          <p className={cx('text')}>Diễn đàn</p>
        </Link>

        <Link to={config.routes.cart} className={cx('list')} onClick={() => handleClick('cart')}>
          <div className={cx('cart-icon')}>
            {user && cart && cart.products.length > 0 ? (
              <div className={cx('cart-amount')}>
                <span>{cart && cart.products.length}</span>
              </div>
            ) : (
              ''
            )}
            <p to={config.routes.cart}>
              <FontAwesomeIcon
                className={cx('icon', navigation === 'cart' && 'active')}
                icon={faCartPlus}
              ></FontAwesomeIcon>
            </p>
          </div>
          <p className={cx('text-cart')}>Giỏ hàng</p>
        </Link>
        <Link to={config.routes.profile} className={cx('list')} onClick={() => handleClick('user')}>
          <FontAwesomeIcon icon={faUser} className={cx('icon', navigation === 'user' && 'active')}></FontAwesomeIcon>
          <p className={cx('text')}>Tài khoản</p>
        </Link>
      </div>
    </div>
  );
}

export default NaviMobi;
