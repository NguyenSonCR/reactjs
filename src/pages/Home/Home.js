import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from '~/contexts/CategoryContext';
import Products from '../Products';
import styles from './Home.module.scss';
import NaviMobi from '~/layouts/components/NaviMobi';
import { AuthContext } from '~/contexts/AuthContext';
const cx = classNames.bind(styles);

function Home() {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  const { chooseNavigation } = useContext(AuthContext);

  useEffect(() => {
    chooseNavigation('home');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCategories(categories);
    // eslint-disable-next-line
  }, []);

  const { chooseCategory } = useContext(CategoryContext);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('category')}>
        <div className={cx('category-header')}>
          <p className={cx('category-header-text')}>DANH MỤC</p>
        </div>
        <div className={cx('category-content')}>
          {categories &&
            categories.map((category, index) => (
              <Link
                to={`/category/${category.slug}`}
                onClick={() => chooseCategory(category)}
                className={cx('category-body')}
                key={index}
              >
                <img src={category.img} className={cx('body-img')} alt=""></img>
                <p className={cx('body-title')}>{category.name}</p>
              </Link>
            ))}
        </div>
        <div className={cx('suggest')}>
          <div className={cx('suggest-header')}>
            <p className={cx('suggest-header-text')}>GỢI Ý HÔM NAY</p>
          </div>
          <Products />
        </div>
        {width < 740 && <NaviMobi />}
      </div>
    </div>
  );
}

export default Home;
