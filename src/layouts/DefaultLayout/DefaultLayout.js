import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import Footer from '../components/Footer';
import styles from './DefaultLayout.module.scss';
import { Fragment } from 'react';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  return (
    <div className={cx('app')}>
      <div className={cx('wrapper', ['grid', 'wide'])}>
        <Header />
        <div className={cx('container', ['row'])}>
          {width > 740 ? (
            <Fragment>
              <Sidebar />
              <div className={cx(['col', 'l-9', 'm-9', 'c-9'])}>{children}</div>
            </Fragment>
          ) : (
            <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>{children}</div>
          )}
        </div>
        {width < 740 && <div className={cx('responsive')}></div>}
        {width > 740 && <Footer />}
      </div>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
