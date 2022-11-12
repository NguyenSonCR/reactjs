import {
  CATEGORIES_LOADED_FAIL,
  CATEGORIES_LOADED_SUCCESS,
  FIND_CATEGORY,
  SET_CATEGORY_CHILD,
  RANGE_PRICE,
  CHOOSE_RANGE,
  SET_PRODUCTS_FILTER,
} from '~/contexts/constants';

export const categoryReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORIES_LOADED_SUCCESS:
      return {
        ...state,
        categories: payload,
        categoriesLoading: false,
      };

    case CATEGORIES_LOADED_FAIL:
      return {
        ...state,
        category: [],
        categories: [],
        categoriesLoading: false,
      };

    case SET_CATEGORY_CHILD:
      return {
        ...state,
        categoryChildren: payload,
      };

    case FIND_CATEGORY:
      return {
        ...state,
        category: payload,
        categoriesLoading: false,
      };

    case RANGE_PRICE:
      return {
        ...state,
        filter: {
          ...state.filter,
          price: payload,
        },
      };

    case CHOOSE_RANGE:
      return {
        ...state,
        filter: {
          ...state.filter,
          range: payload,
        },
      };

    case SET_PRODUCTS_FILTER:
      return {
        ...state,
        productsFilter: payload,
      };
    default:
      return state;
  }
};
