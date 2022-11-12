import { createContext, useReducer } from 'react';
import axios from 'axios';
import { categoryReducer } from '~/reducers/categoryReducer';
import {
  apiUrl,
  CATEGORIES_LOADED_FAIL,
  CATEGORIES_LOADED_SUCCESS,
  FIND_CATEGORY,
  SET_CATEGORY_CHILD,
  RANGE_PRICE,
  CHOOSE_RANGE,
  SET_PRODUCTS_FILTER,
} from './constants';

export const CategoryContext = createContext();
function CategoryContextProvider({ children }) {
  const [categoryState, dispatch] = useReducer(categoryReducer, {
    category: null,
    productsFilter: [],
    categoryChildren: null,
    categories: [],
    categoriesLoading: true,
    filter: {
      range: null,
      price: null,
    },
  });

  // gets all categories
  const getCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products/category`);
      if (response.data.success) {
        dispatch({ type: CATEGORIES_LOADED_SUCCESS, payload: response.data.categories });
      } else {
        dispatch({ type: CATEGORIES_LOADED_FAIL });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get category with slug
  const getCategory = async (slug) => {
    try {
      const response = await axios.get(`${apiUrl}/products/category/${slug}`);
      if (response.data.success) {
        dispatch({ type: FIND_CATEGORY, payload: response.data.category });
      } else {
        dispatch({ type: CATEGORIES_LOADED_FAIL });
      }
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch({ type: CATEGORIES_LOADED_FAIL });
    }
  };

  // choose category Children
  const setCategoryChildren = (categoryChildren) => {
    dispatch({
      type: SET_CATEGORY_CHILD,
      payload: categoryChildren,
    });
  };

  // choose category
  const chooseCategory = (category) => {
    dispatch({
      type: FIND_CATEGORY,
      payload: category,
    });
  };

  // filter
  const rangePrice = (value) => {
    dispatch({ type: RANGE_PRICE, payload: value });
  };

  const chooseRangeProduct = (value) => {
    dispatch({ type: CHOOSE_RANGE, payload: value });
  };

  const setProductsFilter = (data) => {
    dispatch({ type: SET_PRODUCTS_FILTER, payload: data });
  };
  const categoryContextData = {
    categoryState,
    getCategories,
    chooseCategory,
    setCategoryChildren,
    getCategory,
    rangePrice,
    chooseRangeProduct,
    setProductsFilter,
  };

  return <CategoryContext.Provider value={categoryContextData}>{children}</CategoryContext.Provider>;
}

export default CategoryContextProvider;
