import classNames from 'classnames/bind';
import styles from './UserItem.module.scss';
import Button from '../Button';
import config from '~/config';
import { useContext } from 'react';
import { UserContext } from '~/contexts/UserContext';
const cx = classNames.bind(styles);

function ProductItem({ user: { username, address, phonenumber, facebook, _id } }) {
  const { findUser } = useContext(UserContext);

  const chooseUser = (_id) => {
    findUser(_id);
  };
  return (
    <div className={cx(['col', 'l-12', 'c-12', 'm-12'])}>
      <Button to={`${config.routes.users}/${_id}`} className={cx('wrapper')} onClick={chooseUser.bind(this, _id)}>
        <div>
          <p className={cx('text')}>Tên khách hàng: </p>
          <p className={cx('text')}>Địa chỉ: </p>
          <p className={cx('text')}>Số điện thoại: </p>
          <p className={cx('text')}>Facebook: </p>
        </div>
        <div>
          <p className={cx('data')}>{username}</p>
          <p className={cx('data')}>{address}</p>
          <p className={cx('data')}>{phonenumber}</p>
          <p className={cx('data')}>{facebook}</p>
        </div>
      </Button>
    </div>
  );
}

export default ProductItem;
