// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANrTtKlHJ1NfAEBY13lckqHZTGbzVf-gU",
  authDomain: "trade-cen-courrier-service.firebaseapp.com",
  projectId: "trade-cen-courrier-service",
  storageBucket: "trade-cen-courrier-service.firebasestorage.app",
  messagingSenderId: "267410445341",
  appId: "1:267410445341:web:74cc4990544345c19ae2f4",
  measurementId: "G-F33KR362LD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);