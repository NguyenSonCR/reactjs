// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCmzwyeYgyWBRn3C795zpivTazS3jUPGpc',
  authDomain: 'nhat-binh-shop.firebaseapp.com',
  projectId: 'nhat-binh-shop',
  storageBucket: 'nhat-binh-shop.appspot.com',
  messagingSenderId: '364259158829',
  appId: '1:364259158829:web:97da836b26746a6f7ec1a4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};

const facebookProvider = new FacebookAuthProvider();

export const signInWithFaceBook = () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
