import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCkTVfcWWFBn9YqgpMWBGFybCua-Kh8AE",
  authDomain: "estore-83dbc.firebaseapp.com",
  projectId: "estore-83dbc",
  storageBucket: "estore-83dbc.firebasestorage.app",
  messagingSenderId: "1043810747945",
  appId: "1:1043810747945:web:7b7789c0c93947510cbe38",
  measurementId: "G-HK1ETNCEHS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
