import styles from './Purchase.module.scss';
import classNames from 'classnames/bind';
import UserMenu from '~/layouts/components/UserMenu';
import { useRef, useState } from 'react';
import { useContext, useEffect } from 'react';
import { CartContext } from '~/contexts/CartContext';
import { AuthContext } from '~/contexts/AuthContext';
import PurchaseContent from '~/layouts/components/PurchaseContent';

const cx = classNames.bind(styles);

function Purchase() {
  const [content, setContent] = useState(2);
  const scrollRef2 = useRef();
  const scrollRef3 = useRef();
  const scrollRef4 = useRef();
  const scrollRef5 = useRef();
  const onHandleSetContent = (number) => {
    setContent(number);  
  };

  const setScroll = (number) => {
    if(number === 2) {
      scrollRef2.current.scrollIntoView({behavior:"smooth", block: "center", inline:"center"});
    } else if(number === 3) {
      scrollRef3.current.scrollIntoView({behavior:"smooth", block: "center", inline:"center"});
    } else if(number === 4) {
      scrollRef4.current.scrollIntoView({behavior:"smooth", block: "center", inline:"center"});
    } else if(number === 5) {
      scrollRef5.current.scrollIntoView({behavior:"smooth", block: "center", inline:"center"});
    }
  }

  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    authState: { user },
  } = useContext(AuthContext);
  const {
    cartState: { orders },
    getOrders,
  } = useContext(CartContext);

  useEffect(() => {
    getOrders({ username: user.username });
    // eslint-disable-next-line
  }, []);

  let confirm = [];
  let packed = [];
  let shipper = [];
  let transported = [];
  let done = [];
  let cancel = [];

  if (orders.length > 0) {
    orders.forEach((order) => {
      if (order.state.cancel === true) {
        cancel = cancel.concat(order);
      } else if (order.state.confirm === false && order.state.cancel === false) {
        confirm = confirm.concat(order);
      } else if (order.state.packed === false) {
        packed = packed.concat(order);
      } else if (order.state.shipper === false) {
        shipper = shipper.concat(order);
      } else if (order.state.transported === false) {
        transported = transported.concat(order);
      } else {
        done = done.concat(order);
      }
    });
  }

  let body = null;

  if (width > 740) {
    body = (
      <div className={cx('purchase')}>
        <div className={cx(['row'])}>
          <div className={cx(['col', 'l-2', 'm-3', 'c-3'])}>
            <UserMenu />
          </div>
          <div className={cx(['col', 'l-10', 'm-9', 'c-9'])}>
            <div className={cx('body')}>
              <div className={cx('header')}>
                <div className={cx('header-tab', content === 1 && 'active')} onClick={() => onHandleSetContent(1)}>
                  <p className={cx('tab-title')}>
                    Tất cả
                    {orders.length > 0 && <span>({orders.length})</span>}
                  </p>
                </div>
                <div className={cx('header-tab', content === 2 && 'active')} onClick={() => onHandleSetContent(2)}>
                  <p className={cx('tab-title')}>
                    Chờ xác nhận
                    {confirm.length > 0 && <span>({confirm.length})</span>}
                  </p>
                </div>
                <div className={cx('header-tab', content === 3 && 'active')} onClick={() => onHandleSetContent(3)}>
                  <p className={cx('tab-title')}>
                    Chờ lấy hàng
                    {shipper.length > 0 && <span>({shipper.length})</span>}
                  </p>
                </div>
                <div className={cx('header-tab', content === 4 && 'active')} onClick={() => onHandleSetContent(4)}>
                  <p className={cx('tab-title')}>
                    Đang giao
                    {transported.length > 0 && <span>({transported.length})</span>}
                  </p>
                </div>
                <div className={cx('header-tab', content === 5 && 'active')} onClick={() => onHandleSetContent(5)}>
                  <p className={cx('tab-title')}>
                    Đã giao
                    {done.length > 0 && <span>({done.length})</span>}
                  </p>
                </div>
                <div className={cx('header-tab', content === 6 && 'active')} onClick={() => onHandleSetContent(6)}>
                  <p className={cx('tab-title')}>
                    Đã hủy
                    {cancel.length > 0 && <span>({cancel.length})</span>}
                  </p>
                </div>
              </div>
              <div className={cx('content')}>
                <PurchaseContent
                  content={content}
                  data={{ orders, confirm, cancel, packed, shipper, transported, done }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    body = (
      <div className={cx('purchase')}>
        <div className={cx('body')}>
          <div className={cx('header-mobile')} >
            <div className={cx('header-tab-mobile', content === 1 && 'active')} onClick={() => onHandleSetContent(1)}>
              <p className={cx('tab-title-mobile')}>
                Tất cả
                {orders.length > 0 && <span>({orders.length})</span>}
              </p>
            </div>
            <div className={cx('header-tab-mobile', content === 2 && 'active')} ref={scrollRef2} onClick={() => {
              setScroll(2)
              onHandleSetContent(2)}}>
              <p className={cx('tab-title-mobile')}>
                Chờ xác nhận
                {confirm.length > 0 && <span>({confirm.length})</span>}
              </p>
            </div>
            <div className={cx('header-tab-mobile', content === 3 && 'active')} ref={scrollRef3}  onClick={() => {
              setScroll(3)
              onHandleSetContent(3)}}>
              <p className={cx('tab-title-mobile')}>
                Chờ lấy hàng
                {shipper.length > 0 && <span>({shipper.length})</span>}
              </p>
            </div>
            <div className={cx('header-tab-mobile', content === 4 && 'active')} ref={scrollRef4}  onClick={() => {
              setScroll(4)
              onHandleSetContent(4)}}>
              <p className={cx('tab-title-mobile')}>
                Đang giao
                {transported.length > 0 && <span>({transported.length})</span>}
              </p>
            </div>
            <div className={cx('header-tab-mobile', content === 5 && 'active')} ref={scrollRef5} onClick={() => {
              setScroll(5)
              onHandleSetContent(5)}}>
              <p className={cx('tab-title-mobile')}>
                Đã giao
                {done.length > 0 && <span>({done.length})</span>}
              </p>
            </div>
            <div className={cx('header-tab-mobile', content === 6 && 'active')} onClick={() => onHandleSetContent(6)}>
              <p className={cx('tab-title-mobile')}>
                Đã hủy
                {cancel.length > 0 && <span>({cancel.length})</span>}
              </p>
            </div>
          </div>
          <div className={cx('content')}>
            <PurchaseContent content={content} data={{ orders, confirm, cancel, packed, shipper, transported, done }} />
          </div>
        </div>
      </div>
    );
  }
  return body;
}

export default Purchase;
