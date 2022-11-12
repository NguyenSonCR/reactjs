import { faCartPlus, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import config from '~/config';
import { CartContext } from '~/contexts/CartContext';
import styles from './CartFooter.module.scss';

const cx = classNames.bind(styles);
function CartFooter({ data }) {
  console.log(data);
  const {
    cartState: { cart },
  } = useContext(CartContext);
  const { handelAddCart, handleBuy, product, amount } = data;
  return (
    <div className={cx('wrapper')}>
      <Link to={config.routes.home} className={cx('list')}>
        <FontAwesomeIcon icon={faMessage} className={cx('icon', 'active')}></FontAwesomeIcon>
        <p className={cx('text')}>Chat ngay</p>
      </Link>
      <button onClick={() => handelAddCart(product, amount)} className={cx('list-add')}>
        <FontAwesomeIcon className={cx('icon-add')} icon={faCartPlus}></FontAwesomeIcon>
        <p className={cx('text-add')}>Thêm vào giỏ hàng</p>
      </button>
      <button onClick={() => handleBuy(product, amount)} className={cx('list-buy')}>
        <p className={cx('buy')}>Mua ngay</p>
      </button>
      <Link to={config.routes.cart} className={cx('list')}>
        <div className={cx('cart-icon')}>
          {cart && cart.products.length > 0 ? (
            <div className={cx('cart-amount')}>
              <span>{cart && cart.products.length}</span>
            </div>
          ) : (
            ''
          )}
          <p to={config.routes.cart}>
            <FontAwesomeIcon className={cx('icon')} icon={faCartPlus}></FontAwesomeIcon>
          </p>
        </div>
        <p className={cx('text-cart')}>Giỏ hàng</p>
      </Link>
    </div>
  );
}

export default CartFooter;
