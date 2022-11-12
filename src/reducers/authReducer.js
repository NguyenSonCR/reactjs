import { PUT_AUTH, NAVIGATION } from '~/contexts/constants';
export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user, navigate },
  } = action;
  switch (type) {
    case 'SET_AUTH':
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        user,
      };

    case PUT_AUTH:
      return {
        ...state,
        user: user,
      };

    case NAVIGATION:
      return {
        ...state,
        navigation: navigate,
      };

    default:
      return state;
  }
};
