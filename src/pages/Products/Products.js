import { ProductContext } from '~/contexts/ProductContext';
import { Fragment, useState, useContext, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import ProductItem from '~/components/ProductItem';
import Spinner from '~/components/Spinner';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function Products() {
  const {
    productState: { products, productsLoading },
    getProducts,
  } = useContext(ProductContext);

  // get all products
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageSize = 20;
  const [pageNumber, setPageNumber] = useState(1);
  let startIndex = (pageNumber - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize, products.length);
  const currentPage = products.slice(startIndex, endIndex);
  const pageChange = (number) => {
    setPageNumber(number);
  };

  const onPreviousPage = (currentPage) => {
    if (currentPage > 1) setPageNumber(currentPage - 1);
  };

  var totalPages = Math.ceil(products.length / pageSize);
  const onNextPage = (currentPage) => {
    if (currentPage < totalPages) setPageNumber(currentPage + 1);
  };

  let body = null;
  if (productsLoading) {
    return (body = <Spinner />);
  } else if (currentPage && currentPage.length === 0) {
    return (body = (
      <div className={cx('wrapper')}>
        <p className={cx('text')}>Chưa có sản phẩm nào</p>
      </div>
    ));
  } else {
    body = (
      <Fragment>
        <div className={cx('product-body')}>
          <div className={cx(['row', 'sm-gutter'])}>
            {currentPage.map((product, index) => (
              <div key={index} className="col l-2-4 m-4 c-6">
                <ProductItem product={product} />
              </div>
            ))}
          </div>
        </div>
        <Pagination
          pageSize={pageSize}
          totalProducts={products.length}
          onChange={pageChange}
          currentPage={pageNumber}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
        />
      </Fragment>
    );
  }
  return body;
}

export default Products;
