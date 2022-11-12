import styles from './PurchaseItem.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import config from '~/config';
import { useContext, useEffect } from 'react';
import { CartContext } from '~/contexts/CartContext';

const cx = classNames.bind(styles);
function PurchaseItem({ data }) {
  const { title, shipping, listOrder, content } = data;

  const {
    cancelOrder,
    getTransport,
    cartState: { transports },
  } = useContext(CartContext);

  const handleCancel = (order) => {
    cancelOrder({
      id: order._id,
      confirm: false,
      cancel: true,
      packed: false,
      shipper: false,
      transported: false,
      done: false,
    });
  };

  useEffect(() => {
    getTransport();
    // eslint-disable-next-line
  }, []);

  let totalMoney = [];
  let body = null;
  if (listOrder.length === 0) {
    body = (
      <div className={cx('no-list')}>
        <div className={cx('no-list-text')}>Không có đơn hàng nào</div>
      </div>
    );
  } else {
    body = (
      <div className={cx('content')}>
        <div className={cx('header')}>
          {shipping && <div className={cx('shipping')}>Nguyễn sơn</div>}
          <p className={cx('header-text')}>{title}</p>
        </div>
        {listOrder.map((order, i) => {
          const money = order.checkout.reduce((previousValue, currentValue) => {
            return previousValue + currentValue.amount * currentValue.priceCurrent;
          }, 0);
          totalMoney = [
            ...totalMoney,
            {
              id: i,
              ttmoney: money,
            },
          ];

          return (
            <div key={i} className={cx('wrapper')}>
              {order.checkout.map((item, index) => {
                return (
                  <div key={index} className={cx('main')}>
                    <div className={cx('body')}>
                      <div className={cx('info')}>
                        <img className={cx('img')} src={item.product.img} alt=""></img>
                        <div className={cx('description')}>
                          <p className={cx('text')}> {item.product.name}</p>
                          <p className={cx('text')}>{item.amount}</p>
                        </div>
                      </div>
                      <div className={cx('price')}>
                        <p className={cx('price-text')}>
                          Giá mỗi sản phẩm: {item.priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                      </div>
                    </div>
                    <div className={cx('money')}>
                      <p className={cx('money-text')}>
                        Tổng:{' '}
                        <span>
                          {(item.amount * item.priceCurrent).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ{' '}
                        </span>
                      </p>
                    </div>
                    {content === 1 && (
                      <div className={cx('action', 'mobile')}>
                        <Button to={`${config.routes.products}/${item.product.slug}`} primary className={cx('btn')}>
                          Mua Lại
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}

              {content === 2 ? (
                <div className={cx('action')}>
                  <div className={cx('total-money')}>
                    <p className={cx('total-money-text')}>
                      Số tiền vận chuyển:{' '}
                      {transports && (
                        <span>{transports[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ</span>
                      )}
                    </p>
                    <p className={cx('total-money-text')}>
                      Tổng tiền phải trả:{' '}
                      {transports && (
                        <span>
                          {transports[0].price && totalMoney.length > 0
                            ? (totalMoney[i].ttmoney + transports[0].price)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                            : transports[0].price}{' '}
                          đ
                        </span>
                      )}
                    </p>
                  </div>
                  <div className={cx('action-btn', 'mobile')}>
                    <Button text primary>
                      Liên hệ với người bán
                    </Button>
                    <Button text primary onClick={() => handleCancel(order)} className={cx('btn')}>
                      Hủy đơn hàng
                    </Button>
                  </div>
                </div>
              ) : content === 3 ? (
                <div className={cx('action', 'mobile')}>
                  <Button text primary className={cx('btn')}>
                    Xem chi tiết
                  </Button>
                </div>
              ) : content === 4 ? (
                <div className={cx('action', 'mobile')}>
                  <Button text primary className={cx('btn')}>
                    Đã nhận
                  </Button>
                </div>
              ) : content === 6 ? (
                <div className={cx('action', 'mobile')}>
                  <Button text primary className={cx('btn')}>
                    Mua lại
                  </Button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return body;
}

export default PurchaseItem;
