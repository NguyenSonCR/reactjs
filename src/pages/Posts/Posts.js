import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import Spinner from '~/components/Spinner';
import config from '~/config';
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '~/contexts/PostContext';

import PostItem from '~/components/PostItem';
import Button from '~/components/Button';
import Pagination from '~/components/Pagination';
import NaviMobi from '~/layouts/components/NaviMobi';
import { AuthContext } from '~/contexts/AuthContext';

const cx = classNames.bind(styles);
function Posts() {
  const {
    postsState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContext);

  const { chooseNavigation } = useContext(AuthContext);

  useEffect(() => {
    chooseNavigation('post');
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, [postsLoading]);

  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  const [pageNumber, setPageNumber] = useState(1);
  let startIndex = (pageNumber - 1) * 10;
  let endIndex = Math.min(startIndex + 10, posts.length);
  const currentPage = posts.slice(startIndex, endIndex);
  const pageChange = (number) => {
    setPageNumber(number);
  };

  const onPreviousPage = (currentPage) => {
    if (currentPage > 1) setPageNumber(currentPage - 1);
  };

  var totalPages = Math.ceil(posts.length / 10);
  const onNextPage = (currentPage) => {
    if (currentPage < totalPages) setPageNumber(currentPage + 1);
  };

  let body = null;
  if (postsLoading) {
    body = <Spinner />;
  } else if (posts.length === 0) {
    body = (
      <div className={cx('content-nopost')}>
        <div className={cx('wrapper')}>
          <p className={cx('text-nopost')}>Chưa có bài viết nào</p>
          <Button primary to={config.routes.home} className={cx('link')}>
            Quay lại trang chủ
          </Button>
        </div>

        {width < 740 && <NaviMobi />}
      </div>
    );
  } else {
    if (width > 740) {
      body = (
        <div className={cx('post')}>
          <div className={cx(['row', 'sm-gutter'])}>
            <h3 className={cx('title')}>Tất cả bài viết</h3>
            {currentPage.map((post, index) => (
              <div key={index} className="col l-12 m-12 c-12">
                <PostItem key={index} post={post}></PostItem>
              </div>
            ))}
          </div>
          {pageNumber > 1 && (
            <Pagination
              pageSize={10}
              totalProducts={posts.length}
              onChange={pageChange}
              currentPage={pageNumber}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
            />
          )}
          {width < 740 && <NaviMobi />}
        </div>
      );
    } else {
      body = (
        <div className={cx('post')}>
          <div className={cx(['row', 'sm-gutter'])}>
            <h3 className={cx('header-title')}>Tất cả bài viết</h3>
            {currentPage.map((post, index) => (
              <div key={index} className="col l-12 m-12 c-12">
                <Button key={index} to={`${config.routes.posts}/${post.slug}`} className={cx('wrapper')}>
                  <div className={cx('text')}>
                    <h4 className={cx('title')}>{post.title}</h4>
                    <p className={cx('header')}>{post.header}</p>
                    <p className={cx('content')}>{post.content}</p>
                    <img className={cx('img')} src={post.img[0]} alt="" />
                  </div>
                </Button>
              </div>
            ))}
          </div>
          {pageNumber > 1 && (
            <Pagination
              pageSize={10}
              totalProducts={posts.length}
              onChange={pageChange}
              currentPage={pageNumber}
              onPreviousPage={onPreviousPage}
              onNextPage={onNextPage}
            />
          )}
          {width < 740 && <NaviMobi />}
        </div>
      );
    }
  }
  return body;
}

export default Posts;
