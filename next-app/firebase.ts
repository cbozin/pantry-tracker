// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import dotenv from 'dotenv';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFapCM63k9Bpgk64xRhnfxPs0kx1v8AU4",
  authDomain: "pantry-tracker-88acd.firebaseapp.com",
  projectId: "pantry-tracker-88acd",
  storageBucket: "pantry-tracker-88acd.appspot.com",
  messagingSenderId: "50758052996",
  appId: "1:50758052996:web:bbdc68ca7a1f089b16e6d1",
  measurementId: "G-RG9CL5RXR8"
};

// dotenv.config()
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app);
export {app, firebaseConfig, firestore}; 