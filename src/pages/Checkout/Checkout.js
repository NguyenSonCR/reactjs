import styles from './Checkout.module.scss';
import classNames from 'classnames/bind';
import { useContext, useEffect, useState } from 'react';

import { CartContext } from '~/contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { ProductContext } from '~/contexts/ProductContext';
import { AuthContext } from '~/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { ToastContext } from '~/contexts/ToastContext';
const cx = classNames.bind(styles);

function Checkout() {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    cartState: { cart, transports },
    getAllCart,
    addOrder,
    removeCart,
    deleteProductChoose,
    removeProductCheckout,
    getTransport,
  } = useContext(CartContext);

  const {
    authState: { user },
    putInfoUser,
  } = useContext(AuthContext);

  const {
    productState: { products },
    getProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    getAllCart(user.username);
    getProducts();
    getTransport();
    // eslint-disable-next-line
  }, []);
  let checkoutProducts = null;
  if (cart && cart.checkout && products) {
    checkoutProducts = cart.checkout.map((item) => {
      return {
        product: products.find((product) => product.productId === item.productId),
        priceCurrent: item.priceCurrent,
        amount: item.amount,
      };
    });
  }
  let totalMoney = null;
  if (checkoutProducts) {
    totalMoney = checkoutProducts.reduce((total, item) => {
      return total + item.priceCurrent * item.amount;
    }, 0);
  }

  const [formValue, setFormValue] = useState({
    phoneNumber: '',
    address: '',
  });
  useEffect(() => {
    if (user && user.phoneNumber && user.address) {
      setFormValue({
        phoneNumber: user.phoneNumber,
        address: user.address,
      });
    }
    // eslint-disable-next-line
  }, []);
  const { phoneNumber, address } = formValue;
  const onChangeForm = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const [validate, setValidate] = useState(false);

  const putUser = async (event) => {
    event.preventDefault();
    if (phoneNumber.length === 11 || phoneNumber.length === 10) {
      try {
        const response = await putInfoUser(user.username, formValue);
        if (response.success) {
          setModel(false);
          setValidate(false);
        } else {
          addToast({
            id: toastList.length + 1,
            title: 'Thất bại',
            content: response.message,
            type: 'warning',
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      addToast({
        id: toastList.length + 1,
        title: 'Thất bại',
        content: 'Số điện thoại phải là 10 số hoặc 11 số',
        type: 'warning',
      });
      return;
    }
  };
  const {
    toastState: { toastList },
    addToast,
  } = useContext(ToastContext);
  const navigate = useNavigate();
  const handleBuy = async () => {
    if (phoneNumber === '' || address === '') {
      addToast({
        id: toastList.length + 1,
        title: 'Thất bại',
        content: 'Bạn chưa nhập thông tin giao hàng',
        type: 'warning',
      });
      return;
    }
    try {
      const response = await addOrder({
        user,
        checkout: checkoutProducts,
        state: {
          confirm: false,
          cancel: false,
          packed: false,
          shipper: false,
          transported: false,
          done: false,
        },
        shipper: null,
        transport: transports[0],
      });
      if (response.success) {
        removeCart({ username: user.username, listProduct: checkoutProducts });

        for (let i = 0; i < checkoutProducts.length; i++) {
          deleteProductChoose(checkoutProducts[i].product.productId);
        }
        removeProductCheckout({ username: user.username, checkout: [] });

        addToast({
          id: toastList.length + 1,
          title: 'Thành công',
          content: response.message,
          type: 'success',
        });
        navigate(config.routes.purchase);
      } else {
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

  const [model, setModel] = useState(false);

  const handleChangeInfo = () => {
    setValidate(true);
    setModel(true);
    setFormValue({
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
  };

  let body = null;
  if (width > 740) {
    body = (
      <div className={cx('wrapper')}>
        <div className={cx('title')}>Thanh toán</div>
        <div className={cx('content')}>
          <div className={cx('header')}>
            <div className={cx('header-title')}>
              <FontAwesomeIcon className={cx('header-title-icon')} icon={faLocationDot} />
              <p className={cx('header-title-text')}>Địa chỉ nhận hàng</p>
            </div>
            <div className={cx('header-info')}>
              {!user.phoneNumber || !user.address || model ? (
                <form className={cx('input')} onSubmit={putUser}>
                  <div className={cx('input-group')}>
                    <label className={cx('label')} htmlFor="phoneNumber">
                      Nhập số điện thoại:
                    </label>
                    <input
                      name="phoneNumber"
                      value={phoneNumber}
                      type="number"
                      onChange={onChangeForm}
                      className={cx('input-form')}
                      required
                      id="phoneNumber"
                    ></input>
                  </div>
                  <div className={cx('input-group')}>
                    <label className={cx('label')} htmlFor="address">
                      Nhập địa chỉ giao hàng:
                    </label>
                    <input
                      type={'text'}
                      spellCheck="false"
                      name="address"
                      value={address}
                      onChange={onChangeForm}
                      className={cx('input-form')}
                      required
                      id="address"
                    ></input>
                  </div>
                  <div className={cx('input-submit')}>
                    <Button type="submit" text primary>
                      Xác nhận
                    </Button>
                  </div>
                </form>
              ) : (
                <div className={cx('header-info')}>
                  <p className={cx('header-info-text')}>{user.fullName}</p>
                  <p className={cx('header-info-text')}>{user.phoneNumber}</p>
                  <div className={cx('header-info-address')}>{user.address}</div>
                  <div className={cx('header-info-default')}>Mặc định</div>
                  <div className={cx('header-info-change')} onClick={handleChangeInfo}>
                    Thay đổi
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={cx('body')}>
            <div className={cx('body-header')}>
              <ul className={cx('body-header-list')}>
                <li className={cx('body-header-item')}>Sản phẩm</li>
                <li className={cx('body-header-item')}>Đơn giá</li>
                <li className={cx('body-header-item')}>Số lượng</li>
                <li className={cx('body-header-item')}>Thành tiền</li>
              </ul>
            </div>
            <div className={cx('body-content')}>
              {checkoutProducts &&
                checkoutProducts.length > 0 &&
                checkoutProducts.map((item, index) => (
                  <div key={index} className={cx('checkout')}>
                    <img src={item.product.img} className={cx('checkout-img')} alt=""></img>
                    <div className={cx('checkout-description')}>{item.product.name}</div>
                    <div className={cx('checkout-properties')}>
                      {item.priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </div>
                    <div className={cx('checkout-amount')}>{item.amount}</div>
                    <div className={cx('checkout-properties')}>
                      {(item.priceCurrent * item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={cx('body-footer')}>
            <div className={cx('body-footer-content')}>
              Tổng số tiền <span> ({checkoutProducts && checkoutProducts.length} sản phẩm) </span>:{' '}
              {totalMoney && totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </div>
          </div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('footer-title')}>
            <div className={cx('footer-title-text')}>Phương thức thanh toán</div>
            <div>Thanh toán khi nhận hàng</div>
          </div>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item')}>Tổng tiền hàng</p>
            <p className={cx('footer-item')}>
              {totalMoney && totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </p>
          </div>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item')}>Phí vận chuyển</p>
            <p className={cx('footer-item')}>
              {transports && transports.length > 0
                ? transports[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                : 0}
            </p>
          </div>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item')}>Tổng thanh toán</p>
            <p className={cx('footer-item')}>
              {(totalMoney && transports.length) > 0
                ? (totalMoney + (transports && transports[0].price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                : totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              đ
            </p>
          </div>
          <div className={cx('checkout-buy')}>
            {!validate ? (
              <Button className={cx('checkout-btn-mobile')} primary fill onClick={handleBuy}>
                Đặt hàng
              </Button>
            ) : (
              <Button className={cx('checkout-btn-mobile')} primary disable fill onClick={handleBuy}>
                Đặt hàng
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    body = (
      <div className={cx('wrapper')}>
        <div className={cx('title')}>Thanh toán</div>
        <div className={cx('content')}>
          <div className={cx('header')}>
            <div className={cx('header-title')}>
              <FontAwesomeIcon className={cx('header-title-icon')} icon={faLocationDot} />
              <p className={cx('header-title-text')}>Địa chỉ nhận hàng</p>
            </div>
            <div className={cx('header-info-mobile-wrapper')}>
              {!user.phoneNumber || !user.address || model ? (
                <form className={cx('input')} onSubmit={putUser}>
                  <div className={cx('input-group')}>
                    <label className={cx('label')} htmlFor="phoneNumber">
                      Nhập số điện thoại:
                    </label>
                    <input
                      name="phoneNumber"
                      value={phoneNumber}
                      type="number"
                      onChange={onChangeForm}
                      className={cx('input-form')}
                      required
                      id="phoneNumber"
                    ></input>
                  </div>
                  <div className={cx('input-group')}>
                    <label className={cx('label')} htmlFor="address">
                      Nhập địa chỉ giao hàng:
                    </label>
                    <input
                      type={'text'}
                      spellCheck="false"
                      name="address"
                      value={address}
                      onChange={onChangeForm}
                      className={cx('input-form')}
                      required
                      id="address"
                    ></input>
                  </div>
                  <div className={cx('input-submit')}>
                    <Button type="submit" text primary>
                      Xác nhận
                    </Button>
                  </div>
                </form>
              ) : (
                <div className={cx('header-info-mobile')}>
                  <div className={cx('header-info-user')}>
                    <p className={cx('header-info-text')}>{user.fullName || user.username}</p>
                    <p className={cx('header-info-text')}>{user.phoneNumber}</p>
                  </div>
                  <div className={cx('header-address')}>
                    <div className={cx('header-info-address')}>{user.address}</div>
                    <div className={cx('header-info-default')}>Mặc định</div>
                    <div className={cx('header-info-change')} onClick={handleChangeInfo}>
                      Thay đổi
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={cx('body')}>
            <div className={cx('body-content')}>
              {checkoutProducts &&
                checkoutProducts.length > 0 &&
                checkoutProducts.map((item, index) => (
                  <div key={index} className={cx('checkout-mobile')}>
                    <img src={item.product.img} className={cx('checkout-img-mobile')} alt=""></img>
                    <div className={cx('checkout-info')}>
                      <div className={cx('checkout-description-mobile')}>{item.product.name}</div>
                      <div className={cx('checkout-price')}>
                        <div className={cx('checkout-properties-mobile')}>
                          {(item.priceCurrent * item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </div>
                        <div className={cx('checkout-amount')}> Số lượng: {item.amount}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className={cx('body-footer-mobile')}>
            <span className={cx('body-footer-mobile-text')}>
              Tổng số tiền ({checkoutProducts && checkoutProducts.length} sản phẩm):{' '}
              {totalMoney && totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </span>
          </div>
        </div>
        <div className={cx('footer')}>
          <div className={cx('footer-title')}>
            <div className={cx('footer-title-text-mobile')}>Phương thức thanh toán</div>
            <div className={cx('footer-title-text-mobile')}>Thanh toán khi nhận hàng</div>
          </div>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item')}>Tổng tiền hàng</p>
            <p className={cx('footer-item')}>
              {totalMoney && totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </p>
          </div>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item')}>Phí vận chuyển</p>
            <p className={cx('footer-item')}>
              {transports && transports[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </p>
          </div>
        </div>
        <div className={cx('footer-mobile')}>
          <div className={cx('footer-list')}>
            <p className={cx('footer-item-mobile')}>
              Tổng cộng:{' '}
              <span>
                {totalMoney &&
                  (totalMoney + (transports && transports[0].price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                đ
              </span>
            </p>
          </div>
          {!validate ? (
            <Button className={cx('checkout-btn-mobile')} primary fill onClick={handleBuy}>
              Đặt hàng
            </Button>
          ) : (
            <Button className={cx('checkout-btn-mobile')} primary disable fill onClick={handleBuy}>
              Đặt hàng
            </Button>
          )}
        </div>
      </div>
    );
  }
  return body;
}

export default Checkout;
