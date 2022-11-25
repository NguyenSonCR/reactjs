import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], visible, offset = [], hideOnClick = false, onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);

  useEffect(() => {
    setHistory([{ data: items }]);
  }, [items]);

  const current = history[history.length - 1];

  const renderItems = () => {
    return (
      current.data.length > 0 &&
      current.data.map((item, index) => {
        const isParent = !!item.children;
        return (
          <MenuItem
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
    <Tippy
      delay={[0, 300]}
      offset={offset}
      placement="bottom-end"
      interactive
      visible={visible}
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx('menu-list', 'mobile')} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx('menu-popper')}>
            {history.length > 1 && (
              <Header
                title={current.title}
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1));
                }}
              />
            )}
            <div className={cx('menu-body')}>{renderItems()}</div>
          </PopperWrapper>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
}
Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
  visible: PropTypes.bool,
};

export default Menu;
