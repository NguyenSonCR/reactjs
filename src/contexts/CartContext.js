import { createContext, useReducer } from 'react';
import { cartReducer } from '~/reducers/cartReducer';
import { apiUrl } from './constants';
import axios from 'axios';
import {
  ADD_CART,
  REMOVE_CART,
  CART_LOADED_SUCCESS,
  CART_LOADED_FAIL,
  CHOOSE_PRODUCT,
  UNCHOOSE_PRODUCT,
  PLUS_AMOUNT_PRODUCT,
  MINUS_AMOUNT_PRODUCT,
  RESET_CHOOSE_PRODUCT,
  DELETE_PRODUCT_CHOOSE,
  SELECT_ALL_PRODUCT,
  ADD_CHECKOUT,
  REMOVE_CHECKOUT,
  ADD_ORDER,
  ORDER_LOADED_SUCCESS,
  ORDER_LOADED_FAIL,
  CANCEL_ORDER,
  GET_TRANSPORT,
} from './constants';

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, {
    checkout: [],
    productSelect: [],
    cart: null,
    cartLoading: true,
    user: null,
    order: null,
    orders: [],
    cancelOrders: [],
    filter: {
      price: null,
      range: null,
    },
    transports: null,
  });

  // add product when choose

  const chooseProduct = (productId, priceCurrent, amount) => {
    dispatch({
      type: CHOOSE_PRODUCT,
      payload: { productId, priceCurrent, amount },
    });
  };

  // get transport
  const getTransport = async () => {
    try {
      const response = await axios.get(`${apiUrl}/transport`);
      if (response.data.success) {
        dispatch({ type: GET_TRANSPORT, payload: response.data.transports });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // unchoose product

  const unChooseProduct = (productId) => {
    dispatch({
      type: UNCHOOSE_PRODUCT,
      payload: { productId },
    });
  };

  // reset productChoose
  const resetProductChoose = () => {
    dispatch({
      type: RESET_CHOOSE_PRODUCT,
      payload: [],
    });
  };

  // set when select all product

  const selectAllProduct = (newChooseProduct) => {
    dispatch({
      type: SELECT_ALL_PRODUCT,
      payload: newChooseProduct,
    });
  };

  // delete productChoose on context
  const deleteProductChoose = (productId) => {
    dispatch({
      type: DELETE_PRODUCT_CHOOSE,
      payload: { productId },
    });
  };
  // them so luong khi da chon san pham
  const plusAmountProduct = (productId) => {
    dispatch({
      type: PLUS_AMOUNT_PRODUCT,
      payload: { productId },
    });
  };

  // bot so luong khi da chon san pham
  const minusAmountProduct = (productId) => {
    dispatch({
      type: MINUS_AMOUNT_PRODUCT,
      payload: { productId },
    });
  };

  // add product on checkout

  const addProductCheckout = async ({ username, checkout }) => {
    try {
      const response = await axios.put(`${apiUrl}/cart/addcheckout`, { username, checkout });
      if (response.data.success) {
        dispatch({
          type: ADD_CHECKOUT,
          payload: response.data.cart.checkout,
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // remove product on checkout

  const removeProductCheckout = async ({ username, checkout }) => {
    try {
      const response = await axios.put(`${apiUrl}/cart/removecheckout`, { username, checkout });
      if (response.data.success) {
        dispatch({
          type: REMOVE_CHECKOUT,
          payload: [],
        });
        return response.data.cart;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // addCart
  const addCart = async (newCart) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/add`, newCart);
      if (response.data.success) {
        dispatch({
          type: ADD_CART,
          payload: response.data.cart,
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // get all product on Cart
  const getAllCart = async (username) => {
    try {
      const response = await axios.get(`${apiUrl}/cart/${username}`);
      if (response.data.success) {
        dispatch({ type: CART_LOADED_SUCCESS, payload: response.data.cart });
      } else {
        dispatch({ type: CART_LOADED_FAIL });
      }
    } catch (error) {
      dispatch({ type: CART_LOADED_FAIL });
    }
  };

  // remove product on cart

  const removeCart = async ({ username, listProduct }) => {
    try {
      const response = await axios.put(`${apiUrl}/cart/remove`, { username, listProduct });
      if (response.data.success) {
        dispatch({
          type: REMOVE_CART,
          payload: response.data.cart,
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const onMinusCart = async (newCart) => {
    try {
      const response = await axios.put(`${apiUrl}/cart/minus`, newCart);
      if (response.data.success) {
        dispatch({
          type: ADD_CART,
          payload: response.data.cart,
        });
        return response.data.cart;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const guestsInfo = async (username) => {
    try {
      const response = await axios.get(`${apiUrl}/users/${username}`);
      if (response.data.success) {
        return response.data.guest;
      } else {
        return response.data.message;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // add order when user buy
  const addOrder = async ({ user, checkout, state, shipper, transport }) => {
    try {
      const response = await axios.post(`${apiUrl}/order/add`, { user, checkout, state, shipper, transport });
      if (response.data.success) {
        dispatch({
          type: ADD_ORDER,
          payload: { user, checkout },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // get order with 01 user
  const getOrders = async ({ username }) => {
    try {
      const response = await axios.get(`${apiUrl}/order/${username}`);
      if (response.data.success) {
        dispatch({
          type: ORDER_LOADED_SUCCESS,
          payload: response.data.orders,
        });
      } else {
        dispatch({ type: ORDER_LOADED_FAIL, payload: { orders: [] } });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // cancel order
  const cancelOrder = async (order) => {
    const { id } = order;
    try {
      const response = await axios.put(`${apiUrl}/order/cancel/${id}`, order);
      if (response.data.success) {
        dispatch({
          type: CANCEL_ORDER,
          payload: response.data.order,
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const cartContextData = {
    cartState,
    addCart,
    getAllCart,
    removeCart,
    onMinusCart,
    chooseProduct,
    unChooseProduct,
    plusAmountProduct,
    minusAmountProduct,
    resetProductChoose,
    deleteProductChoose,
    selectAllProduct,
    addProductCheckout,
    removeProductCheckout,
    guestsInfo,
    addOrder,
    getOrders,
    cancelOrder,
    getTransport,
  };

  return <CartContext.Provider value={cartContextData}>{children}</CartContext.Provider>;
}
export default CartContextProvider;
