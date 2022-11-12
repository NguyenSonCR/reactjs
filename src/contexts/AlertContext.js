import { createContext, useReducer } from 'react';
import { alertReducer } from '~/reducers/alertReducer';
import { ALERT_SHOW, ALERT_HIDE } from '~/contexts/constants';
export const AlertContext = createContext();
function AlertContextProvider({ children }) {
  const [alertState, dispatch] = useReducer(alertReducer, {
    show: null,
    handleFunction: null,
  });

  const alertShow = (slug) => {
    dispatch({ type: ALERT_SHOW, payload: slug });
  };
  const alertHide = () => {
    dispatch({ type: ALERT_HIDE });
  };
  const alertContextData = { alertState, alertShow, alertHide };
  return <AlertContext.Provider value={alertContextData}> {children}</AlertContext.Provider>;
}

export default AlertContextProvider;
