import { ALERT_HIDE, ALERT_SHOW } from '~/contexts/constants';

export const alertReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALERT_SHOW:
      return {
        show: true,
        handleFunction: payload,
      };

    case ALERT_HIDE:
      return {
        show: false,
      };

    default:
      return state;
  }
};
