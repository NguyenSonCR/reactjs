export const apiUrl =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'https://api.nhatbinhshop.com/api';
export const LOCAL_STORAGE_TOKEN_NAME = 'user_NhatBinh';

// user
export const PUT_AUTH = 'PUT_AUTH';
export const UPDATED_AUTH = 'UPDATED_AUTH';
export const NAVIGATION = 'NAVIGATION';

// product
export const PRODUCTS_LOADED_SUCCESS = 'PRODUCTS_LOADED_SUCCESS';
export const PRODUCTS_LOADED_FAIL = 'PRODUCTS_LOADED_FAIL';
export const FIND_PRODUCT = 'FIND_PRODUCT';
export const POST_COMMENT = 'POST_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// category

export const CATEGORIES_LOADED_SUCCESS = 'CATEGORIES_LOADED_SUCCESS';
export const CATEGORIES_LOADED_FAIL = 'CATEGORIES_LOADED_FAIL';
export const FIND_CATEGORY = 'FIND_CATEGORY';
export const SET_CATEGORY_CHILD = 'SET_CATEGORY_CHILD';

// filter
export const RANGE_PRICE = 'RANGE_PRICE';
export const CHOOSE_RANGE = 'CHOOSE_RANGE';
export const SET_PRODUCTS_FILTER = 'SET_PRODUCTS_FILTER';

// post
export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const FIND_POST = 'FIND_POST';

// alert
export const ALERT_SHOW = 'ALERT_SHOW';
export const ALERT_HIDE = 'ALERT_HIDE';

// cart
export const ADD_CART = 'ADD_CART';
export const CART_LOADED_SUCCESS = 'CART_LOADED_SUCCESS';
export const CART_LOADED_FAIL = 'CART_LOADED_FAIL';
export const REMOVE_CART = 'REMOVE_CART';
export const CHOOSE_PRODUCT = 'CHOOSE_PRODUCT';
export const UNCHOOSE_PRODUCT = 'UNCHOOSE_PRODUCT';
export const PLUS_AMOUNT_PRODUCT = 'PLUS_AMOUNT_PRODUCT';
export const MINUS_AMOUNT_PRODUCT = 'MINUS_AMOUNT_PRODUCT';
export const RESET_CHOOSE_PRODUCT = 'RESET_CHOOSE_PRODUCT';
export const DELETE_PRODUCT_CHOOSE = 'DELETE_PRODUCT_CHOOSE';
export const SELECT_ALL_PRODUCT = 'SELECT_ALL_PRODUCT';
export const GET_TRANSPORT = 'GET_TRANSPORT';

export const ADD_CHECKOUT = 'ADD_CHECKOUT';
export const REMOVE_CHECKOUT = 'REMOVE_CHECKOUT';
export const ADD_ORDER = 'ADD_ORDER';
export const ORDER_LOADED_SUCCESS = 'ORDER_LOADED_SUCCESS';
export const ORDER_LOADED_FAIL = 'ORDER_LOADED_FAIL';
export const CANCEL_ORDER = 'CANCEL_ORDER';

// toast
export const ADD_TOAST = 'ADD_TOAST';
export const DELETE_TOAST = 'DELETE_TOAST';
