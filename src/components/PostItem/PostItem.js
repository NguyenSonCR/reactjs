import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import Button from '../Button';
import config from '~/config';
const cx = classNames.bind(styles);

function ProductItem({ post: { title, header, content, img, slug } }) {
  return (
    <Button to={`${config.routes.posts}/${slug}`} className={cx('wrapper')}>
      <div className={cx('text')}>
        <h4 className={cx('title')}>{title}</h4>
        <p className={cx('header')}>{header}</p>
      </div>
      <img className={cx('img')} src={img[0]} alt={title} />
    </Button>
  );
}

export default ProductItem;
