// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6lWKPixblmvlWBQA6BOSo2fWG5gAYe1Y",
  authDomain: "petcare-fd130.firebaseapp.com",
  projectId: "petcare-fd130",
  storageBucket: "petcare-fd130.appspot.com",
  messagingSenderId: "1007922913995",
  appId: "1:1007922913995:web:b7bcc563e1f56048be714e",
  measurementId: "G-953ESTRQN5",
};

const app = initializeApp(firebaseConfig);

export default app;
