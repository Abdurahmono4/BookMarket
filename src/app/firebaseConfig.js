"use client";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

const firebaseConfig = {
  apiKey: "AIzaSyC6v97LxtE9-kVH1-zUewc5f0Kf_WxhSqM",
  authDomain: "books-b801f.firebaseapp.com",
  projectId: "books-b801f",
  storageBucket: "books-b801f.appspot.com",
  messagingSenderId: "1089841226637",
  appId: "1:1089841226637:web:66c79520a0cf538fedd3c4",
  measurementId: "G-YX883YR7J9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, auth };
