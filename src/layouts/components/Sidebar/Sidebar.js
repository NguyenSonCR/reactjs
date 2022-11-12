import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Navigation from '~/layouts/components/Navigation';
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx(['col', 'l-2', 'm-2', 'c-3'])}>
      <div className={cx('sidebar')}>
        <Navigation />
      </div>
    </div>
  );
}

export default Sidebar;
