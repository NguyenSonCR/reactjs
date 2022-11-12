import {
  PRODUCTS_LOADED_FAIL,
  PRODUCTS_LOADED_SUCCESS,
  FIND_PRODUCT,
  POST_COMMENT,
  DELETE_COMMENT,
} from '~/contexts/constants';

export const productReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case PRODUCTS_LOADED_SUCCESS:
      return {
        ...state,
        products: payload,
        productsLoading: false,
      };
    case PRODUCTS_LOADED_FAIL:
      return {
        ...state,
        product: [],
        products: [],
        productsLoading: false,
      };
    case FIND_PRODUCT:
      return {
        ...state,
        product: payload,
        productsLoading: false,
      };

    case POST_COMMENT: {
      return {
        ...state,
        product: payload,
      };
    }
    case DELETE_COMMENT: {
      return {
        ...state,
        product: payload,
      };
    }
    default:
      return state;
  }
};
