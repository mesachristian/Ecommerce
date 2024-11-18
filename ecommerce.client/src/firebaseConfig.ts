// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5WoYKAYEz9QEncz7z5CreeU07xkVa2KM",
  authDomain: "serbia-web-store.firebaseapp.com",
  projectId: "serbia-web-store",
  storageBucket: "serbia-web-store.appspot.com",
  messagingSenderId: "1094183118709",
  appId: "1:1094183118709:web:d53125f17eb32e6fde953c",
  measurementId: "G-GVCM8BFB6R",
  databaseURL : "https://serbia-web-store-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
console.log("user", auth.currentUser)

// Initialize Google provider
export const googleProvider = new GoogleAuthProvider();