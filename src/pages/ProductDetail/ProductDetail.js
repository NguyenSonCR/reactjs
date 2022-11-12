import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '~/contexts/ProductContext';
import Spinner from '~/components/Spinner';
import config from '~/config';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft, faChevronRight, faClose, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '~/contexts/AuthContext';
import { CartContext } from '~/contexts/CartContext';
import { ToastContext } from '~/contexts/ToastContext';
import Comment from '~/components/Comment/Comment';
import ButtonBuy from '~/layouts/components/ButtonBuy';
const cx = classNames.bind(styles);

function ProductDetail() {
  let { slug } = useParams();
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  const {
    productState: { product },
    getProduct,
  } = useContext(ProductContext);

  const {
    toastState: { toastList },
    addToast,
  } = useContext(ToastContext);

  // get one product with slug
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  const { addCart } = useContext(CartContext);

  useEffect(() => {
    getProduct(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const [amount, setAmount] = useState(1);

  const onMinus = (amount) => {
    if (amount > 1) setAmount(amount - 1);
  };

  const onPlus = (amount) => {
    setAmount(amount + 1);
  };

  const navigate = useNavigate();

  // toast
  const handelAddCart = async (product, amount) => {
    if (!isAuthenticated) {
      navigate(config.routes.login);
    } else {
      try {
        const response = await addCart({ username: user.username, product, amount: amount });
        if (response.success) {
          addToast({
            id: toastList.length + 1,
            title: 'Thành công',
            content: response.message,
            type: 'success',
          });
        } else {
          addToast({
            id: toastList.length + 1,
            title: 'Thất bại',
            content: response.message,
            type: 'error',
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBuy = async (product, amount) => {
    try {
      if (!isAuthenticated) {
        navigate(config.routes.login);
      } else {
        const response = await addCart({ username: user.username, product, amount: amount });
        if (response.success) navigate(config.routes.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [avatar, setAvatar] = useState({
    id: null,
    img: null,
  });
  const [imgModel, setImgModel] = useState(false);

  let body = null;
  if (product === null) {
    body = <Spinner />;
  } else {
    const {
      name,
      description,
      productId,
      img,
      imgSlide,
      category,
      priceOld,
      priceCurrent,
      saleOffPercent,
      saleOffLable,
      bought,
    } = product;

    let slide = [];
    if (img && imgSlide) {
      slide = [img, ...imgSlide];
    }

    if (width < 740) {
      body = (
        <div className={cx('wrapper')}>
          <div className={cx('background')}>
            <div className={cx('image')}>
              <img
                className={cx('img')}
                src={avatar.img ? avatar.img : img}
                alt={name}
                onClick={() => setImgModel(true)}
              ></img>

              {imgModel && (
                <div
                  className={cx('img-model')}
                  onClick={() => {
                    setImgModel(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={cx('img-preview')}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (avatar.id !== 0) {
                        setAvatar({
                          id: avatar.id - 1,
                          img: slide[avatar.id - 1],
                        });
                      }
                    }}
                  ></FontAwesomeIcon>
                  <img
                    className={cx('img-model-content')}
                    src={avatar.img ? avatar.img : img}
                    alt={name}
                    onClick={(event) => event.stopPropagation()}
                  ></img>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className={cx('img-next')}
                    onClick={(event) => {
                      event.stopPropagation();
                      if (avatar.id < slide.length - 1) {
                        setAvatar({
                          id: avatar.id + 1,
                          img: slide[avatar.id + 1],
                        });
                      }
                    }}
                  ></FontAwesomeIcon>
                </div>
              )}
              <div className={cx('slide-mobile')}>
                {slide.map((url, index) => (
                  <img
                    key={index}
                    onClick={() =>
                      setAvatar({
                        id: index,
                        img: url,
                      })
                    }
                    className={cx('img-slide')}
                    src={url}
                    alt={name}
                  ></img>
                ))}
              </div>
            </div>

            <div className={cx('info')}>
              <div className={cx('header')}>
                <h4 className={cx('list-title')}> {name} </h4>
                <div className={cx('info-detail')}>
                  <p className={cx('rate')}>
                    <span>{product.comment.length > 0 && product.comment.length}</span> Đánh giá
                  </p>
                  <p className={cx('bought')}>
                    <span>{bought}</span> Đã bán
                  </p>
                </div>

                <div className={cx('price-mobile')}>
                  <p className={cx('price-old')}> {priceOld.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                  <p className={cx('price-current')}>
                    {priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                  </p>
                  <p className={cx('percent-sale')}>
                    {saleOffPercent}% {saleOffLable}
                  </p>
                </div>

                <div className={cx('list-quantity-mobile')}>
                  <p className={cx('title-amount')}>Số lượng</p>
                  <div className={cx('amount')}>
                    <FontAwesomeIcon
                      className={cx('amount-icon')}
                      onClick={() => onMinus(amount)}
                      icon={faMinus}
                    ></FontAwesomeIcon>
                    <span className={cx('amount-text')}>{amount}</span>
                    <FontAwesomeIcon
                      className={cx('amount-icon')}
                      onClick={() => onPlus(amount)}
                      icon={faPlus}
                    ></FontAwesomeIcon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <h4 className={cx('title')}> CHI TIẾT </h4>
                <p className={cx('list')}>{description}</p>
              </div>
            </div>
          </div>
          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <h4 className={cx('title')}> ĐÁNH GIÁ </h4>
                <Comment product={product} />
              </div>
            </div>
          </div>

          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <div className={cx('action')}>
                  <Button primary to={config.routes.home}>
                    Quay lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ButtonBuy data={{ handelAddCart, handleBuy, product, amount }} />
        </div>
      );
    } else {
      body = (
        <div className={cx('wrapper')}>
          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-4', 'm-6', 'c-6'])}>
                <div className={cx('image')}>
                  <img
                    className={cx('img')}
                    onClick={() => setImgModel(true)}
                    src={avatar.img ? avatar.img : img}
                    alt={name}
                  ></img>
                  {imgModel && (
                    <div
                      className={cx('img-model-pc')}
                      onClick={() => {
                        setImgModel(false);
                      }}
                    >
                      <FontAwesomeIcon className={cx('close-icon')} icon={faClose} />
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        className={cx('img-preview')}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (avatar.id !== 0) {
                            setAvatar({
                              id: avatar.id - 1,
                              img: slide[avatar.id - 1],
                            });
                          }
                        }}
                      ></FontAwesomeIcon>
                      <img
                        className={cx('img-model-content-pc')}
                        src={avatar.img ? avatar.img : img}
                        alt={name}
                        onClick={(event) => event.stopPropagation()}
                      ></img>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className={cx('img-next')}
                        onClick={(event) => {
                          event.stopPropagation();
                          if (avatar.id < slide.length - 1) {
                            setAvatar({
                              id: avatar.id + 1,
                              img: slide[avatar.id + 1],
                            });
                          }
                        }}
                      ></FontAwesomeIcon>
                    </div>
                  )}
                  <div className={cx('slide')}>
                    {slide.map((url, index) => (
                      <img
                        key={index}
                        onClick={() => setAvatar({ id: index, img: url })}
                        className={cx('img-slide')}
                        src={url}
                        alt={name}
                      ></img>
                    ))}
                  </div>
                </div>
              </div>
              <div className={cx(['col', 'l-8', 'm-6', 'c-6'])}>
                <div className={cx('info')}>
                  <div className={cx('header')}>
                    <h4 className={cx('list-title')}> {name} </h4>
                    <div className={cx('info-detail')}>
                      <p className={cx('rate')}>
                        <span>{product.comment.length > 0 && product.comment.length}</span> Đánh giá
                      </p>
                      <p className={cx('bought')}>
                        <span>{bought}</span> Đã bán
                      </p>
                    </div>
                    {width < 740 ? (
                      <div className={cx('price-mobile')}>
                        <p className={cx('price-old')}> {priceOld.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                        <p className={cx('price-current')}>
                          {priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                        <p className={cx('percent-sale')}>
                          {saleOffPercent}% {saleOffLable}
                        </p>
                      </div>
                    ) : (
                      <div className={cx('price')}>
                        <p className={cx('price-old')}> {priceOld.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</p>
                        <p className={cx('price-current')}>
                          {priceCurrent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                        </p>
                        <p className={cx('percent-sale')}>
                          {saleOffPercent}% {saleOffLable}
                        </p>
                      </div>
                    )}

                    <div className={cx('list-quantity')}>
                      <p className={cx('title-amount')}>Số lượng</p>
                      <div className={cx('amount')}>
                        <FontAwesomeIcon
                          className={cx('amount-icon')}
                          onClick={() => onMinus(amount)}
                          icon={faMinus}
                        ></FontAwesomeIcon>
                        <span className={cx('amount-text')}>{amount}</span>
                        <FontAwesomeIcon
                          className={cx('amount-icon')}
                          onClick={() => onPlus(amount)}
                          icon={faPlus}
                        ></FontAwesomeIcon>
                      </div>
                    </div>

                    {width > 740 && (
                      <div className={cx('list')}>
                        <Button text primary onClick={() => handelAddCart(product, amount)} className={cx('cart')}>
                          <FontAwesomeIcon className={cx('cart-icon')} icon={faCartPlus}></FontAwesomeIcon>
                          <p className={cx('cart-text')}>Thêm vào giỏ hàng</p>
                        </Button>
                        <Button text className={cx('buy-text')} primary onClick={() => handleBuy(product, amount)}>
                          Mua ngay
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <h3 className={cx('title')}> Chi tiết sản phẩm</h3>
              </div>

              <div className={cx(['col', 'l-9', 'm-6', 'c-12'])}>
                <div className={cx('menu')}>
                  <div className={cx('menu-item')}>
                    <h4 className={cx('list')}> Tên sản phẩm: </h4>
                    <p className={cx('list')}> Danh mục: </p>
                    <p className={cx('list')}> Giá hiện tại: </p>
                    <p className={cx('list')}> Giá cũ: </p>
                    <p className={cx('list')}> Giảm giá: </p>
                    <p className={cx('list')}> Mã sản phẩm:</p>
                    <p className={cx('list')}> Đã mua:</p>
                  </div>
                  <div className={cx('menu-value')}>
                    <h4 className={cx('list-value')}> {name}</h4>
                    <p className={cx('list-value')}> {category}</p>
                    <p className={cx('list-value')}> {priceCurrent}</p>
                    <p className={cx('list-value')}> {priceOld}</p>
                    <p className={cx('list-value')}> {saleOffPercent}</p>
                    <p className={cx('list-value')}> {productId}</p>
                    <p className={cx('list-value')}> {bought}</p>
                  </div>
                </div>
              </div>
              <div className={cx(['col', 'l-3', 'm-6', 'c-0'])}>
                <div className={cx('wrapper-img')}>
                  <img className={cx('img')} src={img} alt={name}></img>
                </div>
              </div>
            </div>
          </div>
          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <h4 className={cx('title')}> Mô tả sản phẩm: </h4>
                <p className={cx('list')}>{description}</p>
              </div>
            </div>
          </div>
          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <h4 className={cx('title')}> Đánh giá: </h4>
                <Comment product={product} />
              </div>
            </div>
          </div>

          <div className={cx('background')}>
            <div className={cx(['row'])}>
              <div className={cx(['col', 'l-12', 'm-12', 'c-12'])}>
                <div className={cx('action')}>
                  <Button primary to={config.routes.home}>
                    Quay lại
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return body;
}

export default ProductDetail;
