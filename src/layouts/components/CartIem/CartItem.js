import styles from './CartItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function CartItem({ product }) {
  if (product)
    return (
      <Link to={`${config.routes.products}/${product.slug}`} className={cx('wrapper')}>
        <img className={cx('img')} src={product.img} alt={product.img}></img>
        <div className={cx('info')}>
          <p className={cx('name')}>{product.name}</p>
          <span className={cx('id')}>Mã sản phẩm: {product._id}</span>
        </div>
      </Link>
    );
}

export default CartItem;
