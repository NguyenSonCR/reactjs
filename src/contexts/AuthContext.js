import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { authReducer } from '~/reducers/authReducer';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, PUT_AUTH, NAVIGATION } from './constants';
import setAuthToken from '~/utils/setAuthToken';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    navigation: null,
  });

  // config firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyC7GQhvt97RdKnUZhE3108VzlWQ4Dto5NI',
    authDomain: 'nhatbinhshop-b4304.firebaseapp.com',
    projectId: 'nhatbinhshop-b4304',
    storageBucket: 'nhatbinhshop-b4304.appspot.com',
    messagingSenderId: '612070203199',
    appId: '1:612070203199:web:3ca548a1b0d4d19dcabd8a',
    measurementId: 'G-JC02RY0CNH',
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }
    try {
      const response = await axios.get(`${apiUrl}/users`);
      if (response.data.success) {
        dispatch({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // firebase

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        if (result) {
          const userForm = {
            username: result.user.uid,
            email: result.user.email,
            img: result.user.photoURL,
            phonenumber: result.user.phoneNumber,
            fullName: result.user.displayName,
            uid: result.user.uid,
          };

          try {
            const response = await axios.post(`${apiUrl}/users/login/social`, userForm);
            if (response.data.success) {
              localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();
            return response.data;
          } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithFaceBook = async () => {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        if (result) {
          const userForm = {
            username: result.user.uid,
            email: result.user.email,
            img: result.user.photoURL,
            phonenumber: result.user.phoneNumber,
            fullName: result.user.displayName,
            uid: result.user.uid,
          };

          try {
            const response = await axios.post(`${apiUrl}/users/login/social`, userForm);
            if (response.data.success) {
              localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }
            await loadUser();
            return response.data;
          } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/users/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/users/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);

    dispatch({
      type: 'SET_AUTH',
      payload: { isAuthenticated: false, user: null },
    });
  };

  // put info user when checkout

  const putInfoUser = async (username, formValue) => {
    try {
      const response = await axios.put(`${apiUrl}/users/${username}/checkout/addinfo`, formValue);
      if (response.data.success) {
        dispatch({
          type: PUT_AUTH,
          payload: { user: response.data.user },
        });
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // change info when click

  const onChangeInfoUser = async (username) => {
    try {
      const response = await axios.put(`${apiUrl}/users/${username}/checkout/changeinfo`);
      if (response.data.success) {
        dispatch({
          type: PUT_AUTH,
          payload: { user: response.data.user },
        });
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // updated info user
  const updatedUser = async (userInfo) => {
    try {
      const response = await axios.put(`${apiUrl}/users/updated`, userInfo);
      if (response.data.success) {
        dispatch({
          type: PUT_AUTH,
          payload: { user: response.data.user },
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (formValue) => {
    try {
      const response = await axios.put(`${apiUrl}/users/changepassword`, formValue);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const chooseNavigation = (navigate) => {
    dispatch({
      type: NAVIGATION,
      payload: { navigate },
    });
  };
  // context data
  const authContextData = {
    loadUser,
    loginUser,
    authState,
    registerUser,
    logoutUser,
    putInfoUser,
    onChangeInfoUser,
    signInWithGoogle,
    signInWithFaceBook,
    updatedUser,
    changePassword,
    chooseNavigation,
  };

  // return provider
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
