import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Button';
import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

function Alert({ data }) {
  const { title, alertValue, buttonValue, navigateValue, slug, success, cancel } = data;
  let navigate = useNavigate();
  return (
    <div
      className={cx('wrapper')}
      onClick={() => {
        cancel(false);
      }}
    >
      <div className={cx('body')}>
        <p className={cx('title')}> {title} </p>
        <div className={cx('action')}>
          <Button
            deleted
            onClick={async () => {
              const response = await success(slug);
              if (response.success) {
                alert(alertValue);
                navigate(navigateValue);
              } else {
                console.log(response.message);
              }
            }}
          >
            {' '}
            {buttonValue || 'Xóa'}
          </Button>
          <Button
            primary
            onClick={() => {
              cancel(false);
            }}
          >
            {' '}
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
