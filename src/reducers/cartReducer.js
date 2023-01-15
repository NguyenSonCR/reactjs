import {
  ADD_CART,
  CART_LOADED_FAIL,
  CART_LOADED_SUCCESS,
  REMOVE_CART,
  CHOOSE_PRODUCT,
  UNCHOOSE_PRODUCT,
  PLUS_AMOUNT_PRODUCT,
  MINUS_AMOUNT_PRODUCT,
  RESET_CHOOSE_PRODUCT,
  DELETE_PRODUCT_CHOOSE,
  SELECT_ALL_PRODUCT,
  ADD_CHECKOUT,
  ADD_ORDER,
  ORDER_LOADED_FAIL,
  ORDER_LOADED_SUCCESS,
  CANCEL_ORDER,
  GET_TRANSPORT,
} from '~/contexts/constants';
export const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_CART:
      return {
        ...state,
        cart: payload,
      };

    case ADD_CHECKOUT:
      return {
        ...state,
        checkout: payload,
      };

    case ADD_ORDER:
      return {
        ...state,
        order: payload,
      };

    case ORDER_LOADED_SUCCESS:
      return {
        ...state,
        orders: payload,
      };

    case ORDER_LOADED_FAIL:
      return {
        ...state,
        orders: [],
      };

    case CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order._id === payload._id) {
            return {
              user: order.user,
              checkout: order.checkout,
              state: {
                confirm: false,
                cancel: true,
                packed: false,
                shipper: false,
                transported: false,
                done: false,
              },
              shipper: null,
            };
          } else {
            return order;
          }
        }),
      };

    case REMOVE_CART:
      return {
        ...state,
        cart: payload,
      };
    case CART_LOADED_SUCCESS:
      return {
        ...state,
        cart: payload,
        cartLoading: false,
      };

    case CART_LOADED_FAIL:
      return {
        ...state,
        cart: null,
        cartLoading: false,
      };

    case CHOOSE_PRODUCT:
      return {
        ...state,
        productSelect: [...state.productSelect, payload],
      };

    case UNCHOOSE_PRODUCT:
      return {
        ...state,
        productSelect: state.productSelect.filter((item) => item._id !== payload._id),
      };

    case RESET_CHOOSE_PRODUCT:
      return {
        ...state,
        productSelect: payload,
      };

    case DELETE_PRODUCT_CHOOSE:
      return {
        ...state,
        productSelect: state.productSelect.filter((item) => item._id !== payload._id),
      };

    case SELECT_ALL_PRODUCT:
      return {
        ...state,
        productSelect: payload,
      };
    case PLUS_AMOUNT_PRODUCT:
      return {
        ...state,
        productSelect: state.productSelect.map((item) => {
          return {
            _id: item._id,
            priceCurrent: item.priceCurrent,
            amount: item._id === payload._id ? item.amount + 1 : item.amount,
          };
        }),
      };

    case MINUS_AMOUNT_PRODUCT:
      return {
        ...state,
        productSelect: state.productSelect.map((item) => {
          return {
            _id: item._id,
            priceCurrent: item.priceCurrent,
            amount: item._id === payload._id ? item.amount - 1 : item.amount,
          };
        }),
      };

    case GET_TRANSPORT:
      return {
        ...state,
        transports: payload,
      };
    default:
      return state;
  }
};
