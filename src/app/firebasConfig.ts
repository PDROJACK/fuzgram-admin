// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiPZL8T9MCZ8UkCUP65ksRUHXL3SWQ4Ws",
  authDomain: "fuzgram.firebaseapp.com",
  projectId: "fuzgram",
  storageBucket: "fuzgram.appspot.com",
  messagingSenderId: "949761942508",
  appId: "1:949761942508:web:0d282a8dc23884b1e916c9",
  measurementId: "G-R7NTXGD5RB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
