import { createContext, useReducer } from 'react';
import { productReducer } from '~/reducers/productReducer';
import {
  apiUrl,
  PRODUCTS_LOADED_FAIL,
  PRODUCTS_LOADED_SUCCESS,
  FIND_PRODUCT,
  POST_COMMENT,
  DELETE_COMMENT,
} from './constants';
import axios from 'axios';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  // state
  const [productState, dispatch] = useReducer(productReducer, {
    product: null,
    trashProducts: [],
    products: [],
    productsLoading: true,
  });

  // gets all products
  const getProducts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/products`);
      if (response.data.success && response.data.products.length > 0) {
        dispatch({ type: PRODUCTS_LOADED_SUCCESS, payload: response.data.products });
      } else {
        dispatch({ type: PRODUCTS_LOADED_FAIL });
      }
      return response.data;
    } catch (error) {
      dispatch({ type: PRODUCTS_LOADED_FAIL });
    }
  };

  // get one product with slug
  const getProduct = async (slug) => {
    try {
      const response = await axios.get(`${apiUrl}/products/${slug}`);
      if (response.data.success) {
        dispatch({ type: FIND_PRODUCT, payload: response.data.product });
      } else {
        dispatch({ type: PRODUCTS_LOADED_FAIL });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // find post when user click update
  const findProduct = (slug) => {
    const product = productState.products.find((product) => product.slug === slug);
    dispatch({ type: FIND_PRODUCT, payload: product });
  };

  // send comment
  const sendComment = async (comment) => {
    try {
      const response = await axios.patch(`${apiUrl}/products/comment/post`, comment);
      if (response.data.success) {
        dispatch({ type: POST_COMMENT, payload: response.data.product });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // send comment children
  const sendCommentChildren = async (comment) => {
    try {
      const response = await axios.patch(`${apiUrl}/products/comment/children/post`, comment);
      if (response.data.success) {
        dispatch({ type: POST_COMMENT, payload: response.data.product });
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // delete comment
  const deleteComment = async (data) => {
    try {
      const response = await axios.patch(`${apiUrl}/admin/products/comment/delete`, data);
      if (response.data.success) {
        dispatch({ type: DELETE_COMMENT, payload: response.data.product });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // upload file with google storage

  const uploadFileGoogle = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/upload/google-storage`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // multiple
  const uploadFilesGoogle = async (data) => {
    try {
      const response = await axios.post(`${apiUrl}/admin/upload/google-storage/multiple`, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  //  product context data
  const productContextData = {
    productState,
    getProducts,
    getProduct,
    findProduct,
    sendComment,
    deleteComment,
    sendCommentChildren,
    uploadFileGoogle,
    uploadFilesGoogle,
  };

  return <ProductContext.Provider value={productContextData}>{children}</ProductContext.Provider>;
};
export default ProductContextProvider;
