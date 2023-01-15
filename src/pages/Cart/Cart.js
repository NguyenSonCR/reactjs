import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';
import images from '~/assets/img';
import Button from '~/components/Button';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';
import CartProduct from '~/layouts/components/CartProduct';
import config from '~/config';
import Spinner from '~/components/Spinner';
import { ToastContext } from '~/contexts/ToastContext';
import NaviMobi from '~/layouts/components/NaviMobi';

const cx = classNames.bind(styles);
function Cart() {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    cartState: { cart, productSelect, cartLoading },
    getAllCart,
    resetProductChoose,
    selectAllProduct,
    addProductCheckout,
  } = useContext(CartContext);

  const {
    authState: { user },
    chooseNavigation,
  } = useContext(AuthContext);

  const {
    toastState: { toastList },
    addToast,
    deleteToast,
  } = useContext(ToastContext);

  useEffect(() => {
    chooseNavigation('cart');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      toastList.length > 0 &&
        toastList.forEach((toast) => {
          deleteToast(toast.id);
        });
    };
    // eslint-disable-next-line
  });

  const [totalMoney, setTotalMoney] = useState(0);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (productSelect && productSelect.length > 0) {
      const newTotalMoney = productSelect.reduce((total, item) => {
        return total + item.priceCurrent * item.amount;
      }, 0);
      setTotalMoney(newTotalMoney);
    } else {
      setTotalMoney(0);
    }
    if (cart && productSelect && productSelect.length === cart.products.length) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [productSelect, cart]);

  const handleOnChange = () => {
    let chooseAllProduct = null;
    if (cart) {
      chooseAllProduct = cart.products.map((cartItem) => {
        return {
          _id: cartItem.product._id,
          priceCurrent: cartItem.product.priceCurrent,
          amount: cartItem.amount,
        };
      });
    }

    if (isChecked === false) {
      setIsChecked(true);
      selectAllProduct(chooseAllProduct);
    } else {
      setIsChecked(false);
      resetProductChoose();
    }
  };

  const handleBuy = async (productSelect) => {
    try {
      const response = await addProductCheckout({ username: user.username, checkout: productSelect });
      if (!response.success) {
        addToast({
          id: toastList.length + 1,
          title: 'Thất bại',
          content: response.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCart(user.username);
    resetProductChoose();
    // eslint-disable-next-line
  }, [user.username]);

  let body = null;

  if (cartLoading) {
    <div>
      <Spinner />
    </div>;
  } else if (cart && cart.products.length > 0) {
    if (width > 740) {
      body = (
        <div className={cx('wrapper')}>
          <div className={cx('main')}>
            <div className={cx('header')}>
              <h4 className={cx('header-text')}>Giỏ hàng</h4>
            </div>
            <div className={cx('content')}>
              <div className={cx('content-header')}>
                <div className={cx('content__checkbox')}>
                  <input
                    type={'checkbox'}
                    id="product"
                    name="product"
                    value=""
                    checked={isChecked}
                    onChange={handleOnChange}
                    className={cx('header-checkbox')}
                  />
                </div>
                <div className={cx('content__title')} onClick={handleOnChange}>
                  <p className={cx('content__text')}>Sản phẩm </p>
                </div>
                <div className={cx('content__list')}>
                  <p className={cx('content__text')}> Đơn giá</p>
                  <p className={cx('content__text')}> Số lượng </p>
                  <p className={cx('content__text')}> Số tiền </p>
                  <p className={cx('content__text')}> Thao tác</p>
                </div>
              </div>
            </div>
            {cart &&
              cart.products &&
              cart.products.map((cartItem, index) => (
                <CartProduct key={index} cartItem={cartItem} setTotalMoney={setTotalMoney} />
              ))}

            <div className={cx('content')}>
              <div className={cx('content-footer')}>
                <div className={cx('content__checkbox')}>
                  <input
                    type={'checkbox'}
                    id="total"
                    name="total"
                    value=""
                    checked={isChecked}
                    onChange={handleOnChange}
                    className={cx('header-checkbox')}
                  />
                </div>
                <div className={cx('content__title')}>
                  <label className={cx('content__text')} htmlFor="total">
                    Chọn tất cả
                  </label>
                </div>
                <div className={cx('content__list')}>
                  <p className={cx('content__list-text')}> Sản phẩm({productSelect && productSelect.length})</p>
                  <p className={cx('content__text', 'text')}>
                    Tổng thanh toán: {totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                  </p>
                  {productSelect.length === 0 ? (
                    <Button fill disable>
                      Mua hàng
                    </Button>
                  ) : (
                    <Button to={config.routes.checkout} fill onClick={() => handleBuy(productSelect)}>
                      Mua hàng
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      body = (
        <div className={cx('wrapper')}>
          <div className={cx('main')}>
            <div className={cx('header')}>
              <h4 className={cx('header-text')}>Giỏ hàng của tôi</h4>
            </div>
            <div className={cx('content')}>
              {/* <div className={cx('content-header')}>
                <div className={cx('content__checkbox')}>
                  <input
                    type={'checkbox'}
                    id="product"
                    name="product"
                    value=""
                    checked={isChecked}
                    onChange={handleOnChange}
                    className={cx('header-checkbox')}
                  />
                </div>
                <div className={cx('content__title')} onClick={handleOnChange}>
                  <p className={cx('content__text')}>Sản phẩm </p>
                </div>
                <div className={cx('content__list')}>
                  <p className={cx('content__text')}> Đơn giá</p>
                  <p className={cx('content__text')}> Số lượng </p>
                  <p className={cx('content__text')}> Số tiền </p>
                  <p className={cx('content__text')}> Thao tác</p>
                </div>
              </div> */}
            </div>
            {cart &&
              cart.products &&
              cart.products.map((cartItem, index) => (
                <CartProduct key={index} cartItem={cartItem} setTotalMoney={setTotalMoney} />
              ))}

            <div className={cx('content-mobile')}>
              <div className={cx('content__checkbox')}>
                <input
                  type={'checkbox'}
                  id="total"
                  name="total"
                  value=""
                  checked={isChecked}
                  onChange={handleOnChange}
                  className={cx('header-checkbox')}
                />
              </div>

              <div className={cx('content__list-mobile')}>
                <p className={cx('content__text', 'text')}>
                  Tổng cộng: {totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                </p>
                {productSelect.length === 0 ? (
                  <Button primary disable>
                    Mua hàng
                  </Button>
                ) : (
                  <Button to={config.routes.checkout} primary onClick={() => handleBuy(productSelect)}>
                    Mua hàng({productSelect && productSelect.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
          <NaviMobi />
        </div>
      );
    }
  } else {
    body = (
      <div className={cx('cart-null')}>
        <div>
          <img className={cx('cart-null-img')} src={images.noCart} alt=""></img>
        </div>
        <p className={cx('cart-null-text')}>Giỏ hàng trống</p>
        <Button primary to={config.routes.home}>
          Mua hàng ngay
        </Button>
        {width < 740 && <NaviMobi />}
      </div>
    );
  }
  return body;
}

export default Cart;
