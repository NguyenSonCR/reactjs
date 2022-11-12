import styles from './UserMenu.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEdit, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { AuthContext } from '~/contexts/AuthContext';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function UserMenu() {
  const {
    authState: { user },
  } = useContext(AuthContext);
  const [userList, setUserList] = useState(false);
  const onClick = () => {
    if (userList === false) {
      setUserList(true);
    } else {
      setUserList(false);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('user')}>
        <div className={cx('icon')}>
          <img className={cx('user-img')} src={user ? user.img : images.logo} alt=""></img>
        </div>
        <div className={cx('action')}>
          <div className={cx('user-name')}>{user && user.fullName}</div>
          <div className={cx('user-edit')}>
            <FontAwesomeIcon className={cx('edit-icon')} icon={faEdit} />
            <Link to={config.routes.profile} className={cx('user-name')}>
              Sửa hồ sơ
            </Link>
          </div>
        </div>
      </div>
      <div className={cx('navigate')}>
        <div className={cx('navigate-list')}>
          <div className={cx('icon')}>
            <FontAwesomeIcon className={cx('list-icon')} icon={faUser} />
          </div>

          <div>
            <div className={cx('list-text')} onClick={onClick}>
              Tài khoản của tôi
            </div>
            {userList && (
              <ul className={cx('user-list')}>
                <li className={cx('user-item')}>Hồ sơ</li>
                <li className={cx('user-item')}>Ngân hàng</li>
                <li className={cx('user-item')}>Địa chỉ</li>
                <li className={cx('user-item')}>Đổi mật khẩu</li>
              </ul>
            )}
          </div>
        </div>
        <div className={cx('navigate-list')}>
          <div className={cx('icon')}>
            <FontAwesomeIcon className={cx('list-icon')} icon={faStore} />
          </div>
          <p className={cx('list-text')}> Đơn mua</p>
        </div>
        <div className={cx('navigate-list')}>
          <div className={cx('icon')}>
            <FontAwesomeIcon className={cx('list-icon')} icon={faBell} />
          </div>
          <p className={cx('list-text')}>Thông báo</p>
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
