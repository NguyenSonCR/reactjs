import styles from './CartProduct.module.scss';
import classNames from 'classnames/bind';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CartProduct({ children, cartItem }) {
  const [amount, setAmount] = useState(cartItem.amount);
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    cartState: { cart, productSelect },
    removeCart,
    addCart,
    onMinusCart,
    chooseProduct,
    unChooseProduct,
    plusAmountProduct,
    minusAmountProduct,
    deleteProductChoose,
  } = useContext(CartContext);

  const {
    authState: { user },
  } = useContext(AuthContext);

  const handleRemove = (product) => {
    console.log(product);
    removeCart({ username: user.username, listProduct: [{ product: product }] });
    deleteProductChoose(product.productId);
  };

  useEffect(() => {
    setAmount(cartItem.amount);
    // eslint-disable-next-line
  }, [cart]);

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (productSelect.length === cart.products.length) {
      setIsChecked(true);
    } else if (productSelect.length === 0) {
      setIsChecked(false);
    } else {
      if (productSelect.productId === cartItem.product.productId) {
        setIsChecked(true);
      }
    }
    // eslint-disable-next-line
  }, [productSelect]);

  const handleOnChange = () => {
    if (isChecked === false) {
      setIsChecked(!isChecked);
      chooseProduct(cartItem.product.productId, cartItem.product.priceCurrent, amount);
    } else {
      setIsChecked(!isChecked);
      unChooseProduct(cartItem.product.productId);
    }
  };

  const onMinus = (amount) => {
    if (amount > 1) {
      onMinusCart({ username: user.username, product: cartItem.product });
      setAmount(amount - 1);
      minusAmountProduct(cartItem.product.productId);
    }
  };

  const onPlus = (amount) => {
    addCart({ username: user.username, product: cartItem.product, amount: 1 });
    setAmount(amount + 1);
    plusAmountProduct(cartItem.product.productId);
  };

  const totalOneProduct = (cartItem.product.priceCurrent * cartItem.amount)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  let body = null;
  if (width > 740) {
    body = (
      <div className={cx('body')}>
        <div className={cx('content__checkbox')}>
          <input
            className={cx('header-checkbox')}
            type={'checkbox'}
            id={cartItem.product.productId}
            checked={isChecked}
            onChange={handleOnChange}
          />
        </div>
        <div className={cx('body__title')} onClick={handleOnChange}>
          <img className={cx('cart-img')} src={cartItem.product.img} alt="product" />
          <p className={cx('content__text')}> {cartItem.product.name}</p>
        </div>
        <div className={cx('content__list')}>
          <p className={cx('content__text')}>
            {cartItem.product.priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
          </p>
          <div className={cx('list')}>
            <p className={cx('title-amount')}>Số lượng</p>
            <div className={cx('amount')}>
              <FontAwesomeIcon
                className={cx('amount-icon')}
                onClick={() => onMinus(amount)}
                icon={faMinus}
              ></FontAwesomeIcon>
              <span className={cx('amount-text')}>{amount}</span>
              <FontAwesomeIcon
                className={cx('amount-icon')}
                onClick={() => onPlus(amount)}
                icon={faPlus}
              ></FontAwesomeIcon>
            </div>
          </div>
          <p className={cx('content__text')}> {totalOneProduct}đ</p>
          <p className={cx('content__text', 'click')} onClick={() => handleRemove(cartItem.product)}>
            Xóa
          </p>
        </div>
        {children}
      </div>
    );
  } else {
    body = (
      <div className={cx('body')}>
        <div className={cx('content__checkbox')}>
          <input
            className={cx('header-checkbox')}
            type={'checkbox'}
            id={cartItem.product.productId}
            checked={isChecked}
            onChange={handleOnChange}
          />
        </div>
        <div className={cx('body-mobile')}>
          <div className={cx('body__title-mobile')} onClick={handleOnChange}>
            <img className={cx('cart-img-mobile')} src={cartItem.product.img} alt="product" />
          </div>
          <div className={cx('content__list-mobile')}>
            <p className={cx('content__text')}> {cartItem.product.name}</p>
            <div className={cx('content__list-price')}>
              <p className={cx('content__text')}>
                {cartItem.product.priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
              </p>
              <div className={cx('amount')}>
                <FontAwesomeIcon
                  className={cx('amount-icon')}
                  onClick={() => onMinus(amount)}
                  icon={faMinus}
                ></FontAwesomeIcon>
                <span className={cx('amount-text')}>{amount}</span>
                <FontAwesomeIcon
                  className={cx('amount-icon')}
                  onClick={() => onPlus(amount)}
                  icon={faPlus}
                ></FontAwesomeIcon>
              </div>
            </div>
            <div className={cx('action-mobile')}>
              <p className={cx('content__text-mobile')}>Tổng: {totalOneProduct}đ</p>
              <FontAwesomeIcon
                icon={faTrash}
                className={cx('content__text', 'click')}
                onClick={() => handleRemove(cartItem.product)}
              ></FontAwesomeIcon>
            </div>
          </div>
        </div>

        {children}
      </div>
    );
  }
  return body;
}

export default CartProduct;
