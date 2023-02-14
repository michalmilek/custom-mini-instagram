// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAI_jNc5cHug_7t8LtvQul2mwtPzSVCzY",
  authDomain: "insta-20dda.firebaseapp.com",
  projectId: "insta-20dda",
  storageBucket: "insta-20dda.appspot.com",
  messagingSenderId: "994575463143",
  appId: "1:994575463143:web:e7d351b90b3dfa0e6c6842",
  measurementId: "G-VSC4LMTQD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
