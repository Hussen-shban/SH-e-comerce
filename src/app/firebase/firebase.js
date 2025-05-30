// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDfSSIAwCs9q_aeCz8LEhi2O6gFdb-VLkk",
  authDomain: "authecommerce-1a11c.firebaseapp.com",
  projectId: "authecommerce-1a11c",
  storageBucket: "authecommerce-1a11c.appspot.com",
  messagingSenderId: "86492019046",
  appId: "1:86492019046:web:xxxxxxx" // تقدر تجيبه من صفحة Project Settings > General
};

const app = initializeApp(firebaseConfig);
export default app;
