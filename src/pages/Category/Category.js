import classNames from 'classnames/bind';
import Footer from '~/layouts/components/Footer';
import styles from './Category.module.scss';
import Toast from '~/components/Toast';
import images from '~/assets/img';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCaretDown,
  faCaretRight,
  faChevronRight,
  faChevronLeft,
  faFilter,
  faArrowDown,
  faArrowUp,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CategoryContext } from '~/contexts/CategoryContext';
import { ProductContext } from '~/contexts/ProductContext';
import ProductItem from '~/components/ProductItem';
import Button from '~/components/Button';
import NaviMobi from '~/layouts/components/NaviMobi';
const cx = classNames.bind(styles);
function Category() {
  const {
    categoryState: { category, categoryChildren, filter, productsFilter },
    getCategory,
    setCategoryChildren,
    rangePrice,
    chooseRangeProduct,
    setProductsFilter,
  } = useContext(CategoryContext);
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;

  const { slug } = useParams();
  useEffect(() => {
    getCategory(slug);
    // eslint-disable-next-line
  }, [slug]);

  const {
    productState: { products, productsLoading },
    getProducts,
  } = useContext(ProductContext);

  // get all products
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let productCategory = [];

  if (!productsLoading && category) {
    productCategory = products.filter((product) => product.category === category.name);
  }

  if (productsFilter.length > 0) {
    productCategory = productsFilter;
  }

  if (categoryChildren) {
    productCategory = productCategory.filter((product) => product.categoryChild === categoryChildren.childrenName);
  }

  const [formValue, setFormValue] = useState({
    from: '',
    to: '',
  });
  const { from, to } = formValue;

  const onChangeForm = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleFilter = (formValue) => {
    const data = productCategory.filter((product) => {
      if (product.priceCurrent >= formValue.from && product.priceCurrent <= formValue.to) {
        return true;
      } else {
        return false;
      }
    });
    setProductsFilter(data);
  };

  if (filter.range && filter.range === 'new') {
    productCategory = productCategory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (filter.range && filter.range === 'tranding') {
    productCategory = productCategory.sort((a, b) => b.bought - a.bought);
  }

  if (filter.price && filter.price === 'decrease') {
    productCategory = productCategory.sort((a, b) => b.priceCurrent - a.priceCurrent);
  } else if (filter.price === 'increase') {
    productCategory = productCategory.sort((a, b) => a.priceCurrent - b.priceCurrent);
  }

  const [showRange, setShowRange] = useState(false);
  const [price, setPrice] = useState('Giá');

  const handleSetPrice = (newPrice) => {
    setPrice(newPrice);
    setShowRange(false);
  };

  const handleShowRange = () => {
    if (showRange) {
      setShowRange(false);
    } else {
      setShowRange(true);
    }
  };
  useEffect(() => {
    rangePrice(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // pagination
  const [pageNumber, setPageNumber] = useState(1);

  const pageSize = 20;
  let startIndex = (pageNumber - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize, productCategory.length);
  const currentPage = productCategory.slice(startIndex, endIndex);

  const onPreviousPage = (currentPage) => {
    if (currentPage > 1) setPageNumber(currentPage - 1);
  };

  const totalPages = Math.ceil(productCategory.length / pageSize);
  const onNextPage = (currentPage) => {
    if (currentPage < totalPages) setPageNumber(currentPage + 1);
  };

  let body = null;
  if (width > 740) {
    body = (
      <div className={cx('category')} onClick={() => setShowRange(false)}>
        <Toast />
        <div className={cx('wrapper', ['grid', 'wide'])}>
          <div className={cx('container', ['row'])}>
            <div className={cx(['col', 'l-2', 'm-2', 'c-3'], 'sidebar')}>
              <div
                className={cx('header')}
                onClick={() => {
                  setCategoryChildren(null);
                }}
              >
                <FontAwesomeIcon className={cx('header-icon')} icon={faBars} />
                <p className={cx('header-text')}>Tất cả danh mục</p>
              </div>
              <div className={cx('category-children')}>
                {category &&
                  category.children.length > 0 &&
                  category.children.map((item, index) => (
                    <div key={index} className={cx('children')}>
                      {categoryChildren && categoryChildren.childrenName === item.childrenName ? (
                        <div className={cx('children-list')}>
                          <FontAwesomeIcon className={cx('children-icon')} icon={faCaretRight} />
                          <p
                            className={cx('children-text', 'active')}
                            onClick={() => {
                              setCategoryChildren(item);
                            }}
                          >
                            {item.childrenName}
                          </p>
                        </div>
                      ) : (
                        <div className={cx('children-list')}>
                          <div className={cx('null')}></div>
                          <p
                            className={cx('children-text')}
                            onClick={() => {
                              setCategoryChildren(item);
                            }}
                          >
                            {item.childrenName}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
              </div>

              <div className={cx('filter')}>
                <div className={cx('header')}>
                  <FontAwesomeIcon className={cx('header-icon')} icon={faFilter} />
                  <p className={cx('header-text')}>Bộ lọc tìm kiếm </p>
                </div>
                <div className={cx('header-text')}>Theo danh mục</div>
                <div className={cx('filter-content')}>
                  <form className={cx('filter-form')}>
                    {
                      <div className={cx('filter-group')}>
                        <div className={cx('group-title')}>Theo giới tính</div>
                        <div className={cx('form-group')}>
                          <input className={cx('input')} type="checkbox"></input>
                          <label htmlFor="male">Nam</label>
                        </div>
                        <div className={cx('form-group')}>
                          <input className={cx('input')} type="checkbox"></input>
                          <label htmlFor="female">Nữ</label>
                        </div>
                      </div>
                    }

                    <div className={cx('filter-group')}>
                      <div className={cx('group-title')}>Khoảng giá</div>
                      <div className={cx('form-group')}>
                        <input
                          className={cx('input-price')}
                          name="from"
                          value={from}
                          onChange={onChangeForm}
                          type="number"
                          placeholder="đ Từ"
                        ></input>
                        <span htmlFor="EDT" className={cx('span')}>
                          -
                        </span>
                        <input
                          className={cx('input-price')}
                          name="to"
                          value={to}
                          onChange={onChangeForm}
                          type="number"
                          placeholder="đ Đến"
                        ></input>
                      </div>
                    </div>
                    <div className={cx('action')}>
                      <Button
                        text
                        primary
                        onClick={(event) => {
                          event.preventDefault();
                          handleFilter(formValue);
                        }}
                      >
                        Áp dụng
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={cx(['col', 'l-10', 'm-10', 'c-9'])}>
              <div className={cx('body')}>
                <div className={cx('range')}>
                  <div className={cx('range-content')}>
                    <div className={cx('title')}>
                      <p className={cx('title-text')}>Sắp xếp theo</p>
                    </div>
                    <div className={cx('range-item')}>
                      <p className={cx('range-item-text')}> Phổ Biến</p>
                    </div>
                    <div className={cx('range-item', filter.range === 'new' && 'active')}>
                      <p
                        className={cx('range-item-text', filter.range === 'new' && 'active')}
                        onClick={() => {
                          rangePrice(null);
                          setPrice('Giá');
                          chooseRangeProduct('new');
                        }}
                      >
                        Mới Nhất
                      </p>
                    </div>
                    <div className={cx('range-item', filter.range === 'tranding' && 'active')}>
                      <p
                        className={cx('range-item-text', filter.range === 'tranding' && 'active')}
                        onClick={() => {
                          rangePrice(null);
                          setPrice('Giá');
                          chooseRangeProduct('tranding');
                        }}
                      >
                        Bán Chạy
                      </p>
                    </div>
                    <div className={cx('range-item-price')} onClick={(e) => e.stopPropagation()}>
                      <div className={cx('range-price')} onClick={() => handleShowRange()}>
                        <p className={cx('range-price-text')}>{price}</p>
                        <FontAwesomeIcon className={cx('range-icon')} icon={faCaretDown} />
                      </div>
                      {showRange && (
                        <div className={cx('price-children')}>
                          <p
                            className={cx('price-children-text')}
                            onClick={() => {
                              rangePrice('increase');
                              handleSetPrice('Giá: Từ thấp đến cao');
                            }}
                          >
                            Giá: Từ thấp đến cao
                          </p>
                          <p
                            className={cx('price-children-text')}
                            onClick={() => {
                              rangePrice('decrease');
                              handleSetPrice('Giá: Từ cao xuống thấp');
                            }}
                          >
                            Giá: Từ cao xuống thấp
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={cx('range-pagination')}>
                    <div className={cx('page')}>
                      <p className={cx('page-text')}>
                        <span className={cx('page-span')}>{pageNumber}</span>/{totalPages === 0 ? 1 : totalPages}
                      </p>
                    </div>
                    <div className={cx('page-icon')}>
                      <FontAwesomeIcon
                        className={cx('icon-pre', pageNumber === 1 && 'disable')}
                        icon={faChevronLeft}
                        onClick={() => onPreviousPage(pageNumber)}
                      />
                      <FontAwesomeIcon
                        className={cx('icon-pre', pageNumber === totalPages && 'disable')}
                        icon={faChevronRight}
                        onClick={() => onNextPage(pageNumber)}
                      />
                    </div>
                  </div>
                </div>

                {/* product */}
                <div className={cx('product-main')}>
                  <div className={cx(['row', 'sm-gutter'])}>
                    {currentPage && currentPage.length > 0 ? (
                      currentPage.map((product, index) => (
                        <div key={index} className="col l-2-4 m-4 c-6">
                          <ProductItem product={product} />
                        </div>
                      ))
                    ) : (
                      <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                        <div className={cx('cart-null')}>
                          <div>
                            <img className={cx('cart-null-img')} src={images.noCart} alt=""></img>
                          </div>
                          <p className={cx('cart-null-text')}>Không có sản phẩm nào</p>
                          <Button primary to={`/`} onClick={() => setCategoryChildren(null)}>
                            Tìm sản phẩm khác
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  } else {
    body = (
      <div className={cx('category')} onClick={() => setShowRange(false)}>
        <Toast />
        <div className={cx('wrapper', ['grid', 'wide'])}>
          <div className={cx('container', ['row'])}>
            {false && (
              <div className={cx('sidebar')}>
                <div
                  className={cx('header')}
                  onClick={() => {
                    setCategoryChildren(null);
                  }}
                >
                  <FontAwesomeIcon className={cx('header-icon')} icon={faBars} />
                  <p className={cx('header-text')}>Tất cả danh mục</p>
                </div>
                <div className={cx('category-children')}>
                  {category &&
                    category.children.length > 0 &&
                    category.children.map((item, index) => (
                      <div key={index} className={cx('children')}>
                        {categoryChildren && categoryChildren.childrenName === item.childrenName ? (
                          <div className={cx('children-list')}>
                            <FontAwesomeIcon className={cx('children-icon')} icon={faCaretRight} />
                            <p
                              className={cx('children-text', 'active')}
                              onClick={() => {
                                setCategoryChildren(item);
                              }}
                            >
                              {item.childrenName}
                            </p>
                          </div>
                        ) : (
                          <div className={cx('children-list')}>
                            <div className={cx('null')}></div>
                            <p
                              className={cx('children-text')}
                              onClick={() => {
                                setCategoryChildren(item);
                              }}
                            >
                              {item.childrenName}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                <div className={cx('filter')}>
                  <div className={cx('header')}>
                    <FontAwesomeIcon className={cx('header-icon')} icon={faFilter} />
                    <p className={cx('header-text')}>Bộ lọc tìm kiếm </p>
                  </div>
                  <div className={cx('header-text')}>Theo danh mục</div>
                  <div className={cx('filter-content')}>
                    <form className={cx('filter-form')}>
                      {
                        <div className={cx('filter-group')}>
                          <div className={cx('group-title')}>Theo giới tính</div>
                          <div className={cx('form-group')}>
                            <input className={cx('input')} type="checkbox"></input>
                            <label htmlFor="male">Nam</label>
                          </div>
                          <div className={cx('form-group')}>
                            <input className={cx('input')} type="checkbox"></input>
                            <label htmlFor="female">Nữ</label>
                          </div>
                        </div>
                      }

                      <div className={cx('filter-group')}>
                        <div className={cx('group-title')}>Khoảng giá</div>
                        <div className={cx('form-group')}>
                          <input
                            className={cx('input-price')}
                            name="from"
                            value={from}
                            onChange={onChangeForm}
                            type="number"
                            placeholder="đ Từ"
                          ></input>
                          <span htmlFor="EDT" className={cx('span')}>
                            -
                          </span>
                          <input
                            className={cx('input-price')}
                            name="to"
                            value={to}
                            onChange={onChangeForm}
                            type="number"
                            placeholder="đ Đến"
                          ></input>
                        </div>
                      </div>
                      <div className={cx('action')}>
                        <Button
                          text
                          primary
                          onClick={(event) => {
                            event.preventDefault();
                            handleFilter(formValue);
                          }}
                        >
                          Áp dụng
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
              <div className={cx('body')}>
                <div className={cx('range')}>
                  <div className={cx('range-content')}>
                    <div className={cx('range-item-mobile', filter.range === 'new' && 'active')}>
                      <p
                        className={cx('range-item-text-mobile', filter.range === 'new' && 'active')}
                        onClick={() => {
                          rangePrice(null);
                          setPrice('Giá');
                          chooseRangeProduct('new');
                        }}
                      >
                        Mới Nhất
                      </p>
                    </div>
                    <div className={cx('range-item-mobile', filter.range === 'tranding' && 'active')}>
                      <p
                        className={cx('range-item-text-mobile', filter.range === 'tranding' && 'active')}
                        onClick={() => {
                          rangePrice(null);
                          setPrice('Giá');
                          chooseRangeProduct('tranding');
                        }}
                      >
                        Bán Chạy
                      </p>
                    </div>
                    <div className={cx('range-item-price')} onClick={(e) => e.stopPropagation()}>
                      <div
                        className={cx('range-price-mobile')}
                        onClick={() => {
                          if (filter.price === null) {
                            rangePrice('increase');
                          } else if (filter.price === 'increase') {
                            rangePrice('decrease');
                          } else {
                            rangePrice('increase');
                          }
                        }}
                      >
                        <p className={cx('range-price-text')}>Giá</p>
                        {filter.price === null ? (
                          <div className={cx('range-price-default')}>
                            <FontAwesomeIcon className={cx('range-icon-default')} icon={faCaretUp} />
                            <FontAwesomeIcon className={cx('range-icon-default')} icon={faCaretDown} />
                          </div>
                        ) : filter.price === 'increase' ? (
                          <FontAwesomeIcon className={cx('range-icon')} icon={faArrowDown} />
                        ) : (
                          <FontAwesomeIcon className={cx('range-icon')} icon={faArrowUp} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx(['row', 'sm-gutter'])}>
            {currentPage && currentPage.length > 0 ? (
              currentPage.map((product, index) => (
                <div key={index} className="col l-2-4 m-4 c-6">
                  <ProductItem product={product} />
                </div>
              ))
            ) : (
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <div className={cx('cart-null')}>
                  <div>
                    <img className={cx('cart-null-img')} src={images.noCart} alt=""></img>
                  </div>
                  <p className={cx('cart-null-text')}>Không có sản phẩm nào</p>
                  <Button primary to={`/`} onClick={() => setCategoryChildren(null)}>
                    Tìm sản phẩm khác
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        {currentPage && currentPage.length > 0 && (
          <div className={cx(['col', 'c-12'], 'pagination')}>
            <div className={cx('range-pagination-mobile')}>
              <div className={cx('page')}>
                <p className={cx('page-text')}>
                  <span className={cx('page-span')}>{pageNumber}</span>/{totalPages === 0 ? 1 : totalPages}
                </p>
              </div>
              <div className={cx('page-icon')}>
                <FontAwesomeIcon
                  className={cx('icon-pre', pageNumber === 1 && 'disable')}
                  icon={faChevronLeft}
                  onClick={() => onPreviousPage(pageNumber)}
                />
                <FontAwesomeIcon
                  className={cx('icon-pre', pageNumber === totalPages && 'disable')}
                  icon={faChevronRight}
                  onClick={() => onNextPage(pageNumber)}
                />
              </div>
            </div>
          </div>
        )}
        <NaviMobi />
      </div>
    );
  }

  return body;
}

export default Category;
