import classNames from 'classnames/bind';
import styles from './CartMenu.module.scss';
import PropTypes from 'prop-types';
import images from '~/assets/img';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import CartItem from '../CartIem';

const cx = classNames.bind(styles);

function CartMenu({ children, offset, data }) {
  let productCart = [];
  if (data) {
    data.products.map((cartItem) => {
      productCart.push(cartItem.product);
      return productCart;
    });
  }

  return (
    <Tippy
      delay={[0, 300]}
      offset={offset}
      placement="bottom-end"
      interactive
      render={(attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {productCart.length > 0 ? (
              productCart.map((product, index) => <CartItem key={index} product={product} />)
            ) : (
              <div className={cx('cart-null')}>
                <div>
                  <img className={cx('cart-null-img')} src={images.noCart} alt=""></img>
                </div>
                <p className={cx('cart-null-text')}>Giỏ hàng trống</p>
              </div>
            )}
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}

CartMenu.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
};

export default CartMenu;
