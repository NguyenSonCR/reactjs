import classNames from 'classnames/bind';
import styles from './Navigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignsPost, faStore } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import config from '~/config';

import NavItem from './NavItem';
import Header from './Header';
import { CategoryContext } from '~/contexts/CategoryContext';

const cx = classNames.bind(styles);

function Navigation() {
  const onChange = (item) => {
    // console.log(item.code);
  };
  const {
    categoryState: { categories, categoriesLoading },
    getCategories,
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line
  }, []);

  let cate = null;
  let NAV_MENU = [];

  if (categories) {
    cate = categories.map((item) => {
      return {
        icon: '',
        title: item.name,
        to: `/category/${item.slug}`,
        code: item.slug,
      };
    });

    NAV_MENU = [
      {
        icon: <FontAwesomeIcon icon={faStore} />,
        title: 'Sản phẩm',
        to: config.routes.products,
        code: 'products',
      },
      {
        icon: <FontAwesomeIcon icon={faSignsPost} />,
        code: 'posts',
        title: 'Bài viết',
        to: config.routes.posts,
      },
      {
        icon: <FontAwesomeIcon icon={faBars} />,
        code: 'category',
        title: 'Danh mục',
        children: {
          title: 'Danh mục',
          data: cate,
        },
      },
    ];
  }

  const [history, setHistory] = useState([{ data: NAV_MENU }]);

  useEffect(() => {
    setHistory([{ data: NAV_MENU }]);
    // eslint-disable-next-line
  }, [categoriesLoading]);

  const current = history[history.length - 1];
  const renderItems = () => {
    return (
      current.data &&
      current.data.map((item, index) => {
        const isParent = !!item.children;
        return (
          <NavItem
            key={index}
            data={item}
            onClick={() => {
              if (isParent) {
                setHistory((prev) => [...prev, item.children]);
              } else {
                onChange(item);
              }
            }}
          />
        );
      })
    );
  };
  return (
    <nav className={cx('wrapper')}>
      <h3 className={cx('title')}> Menu </h3>
      {history.length > 1 && (
        <Header
          title={current.title}
          onBack={() => {
            setHistory((prev) => prev.slice(0, prev.length - 1));
          }}
        />
      )}
      {renderItems()}
    </nav>
  );
}

export default Navigation;
