// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, GoogleAuthProvider, setPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7c1GGJa38Zanx99Mgh29ykGeijMdzJXE",
  authDomain: "e-commerce-75f1b.firebaseapp.com",
  projectId: "e-commerce-75f1b",
  storageBucket: "e-commerce-75f1b.firebasestorage.app",
  messagingSenderId: "975635914324",
  appId: "1:975635914324:web:51cd7d46eacb6057c6d7c1",
  measurementId: "G-Q63HE07BVF",
  databaseURL : "https://e-commerce-75f1b-default-rtdb.firebaseio.com/"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);
await setPersistence(auth, browserLocalPersistence);
export { auth };
export const database = getDatabase(app);



// Initialize Google provider
export const googleProvider = new GoogleAuthProvider();