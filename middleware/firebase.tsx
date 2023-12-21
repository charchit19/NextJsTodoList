// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration

// const apiKey = process.env.NEXT_PUBLIC_FIREBASE_apiKey;
// const authDomain = process.env.NEXT_PUBLIC_FIREBASE_authDomain;
// const projectId = process.env.NEXT_PUBLIC_FIREBASE_projectId;
// const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_storageBucket;
// const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_measurementId;
// const appId = process.env.NEXT_PUBLIC_FIREBASE_appId;
// const measurementId = process.env.NEXT_PUBLIC_FIREBASE_measurementId;
const apiKey = "AIzaSyCx_h9HmjAllyRDppdTi9RUz-JutidPjls";
const authDomain = "todo-5e701.firebaseapp.com";
const projectId = "todo-5e701";
const storageBucket = "todo-5e701.appspot.com";
const messagingSenderId = "488320199317";
const appId = "1:488320199317:web:cdfbe6aa1114142551499c";
const measurementId = "G-L4JMV347GR";
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
