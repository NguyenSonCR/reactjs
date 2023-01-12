import classNames from 'classnames/bind';
import styles from './PostDetail.module.scss';
import Spinner from '~/components/Spinner';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostContext } from '~/contexts/PostContext';
import config from '~/config';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ProductDetail() {
  const { slug } = useParams();
  const {
    postsState: { postLoading },
    getPost,
  } = useContext(PostContext);

  const [postValue, setPostValue] = useState({
    title: '',
    header: '',
    content: '',
    img: '',
  });

  useEffect(() => {
    getPost(slug).then((post) => {
      setPostValue(post);
    });
    // eslint-disable-next-line
  }, []);

  const { title, header, content } = postValue;

  let body = null;
  if (postLoading) {
    body = <Spinner />;
  } else {
    body = (
      <div className={cx('wrapper')}>
        <h4 className={cx('title')}>{title}</h4>
        <p className={cx('header')}>{header}</p>
        <div className={cx('content', ['ql-editor'])} style={{padding: '8px 0'}} dangerouslySetInnerHTML={{
          __html: content
        }}></div>

        <div className={cx('action')}>
          <Button primary to={config.routes.posts}>
            Quay lại
          </Button>
        </div>
      </div>
    );
  }
  return body;
}

export default ProductDetail;
