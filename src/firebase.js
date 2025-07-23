// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHiyjFMc3dQvtu1Hh2uljPRJ1Q6y-ee3k",
  authDomain: "mocktalk-a26c6.firebaseapp.com",
  projectId: "mocktalk-a26c6",
  storageBucket: "mocktalk-a26c6.firebasestorage.app",
  messagingSenderId: "627050347766",
  appId: "1:627050347766:web:040aa5629dfd46321e80d7",
  measurementId: "G-K8ZN512JS9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
