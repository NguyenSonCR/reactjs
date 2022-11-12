function CategoryModel() {
  return (
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
  );
}

export default CategoryModel;
