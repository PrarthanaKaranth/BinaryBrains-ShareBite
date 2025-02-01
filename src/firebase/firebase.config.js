// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';  // Firebase Authentication import

const firebaseConfig = {
  apiKey: "AIzaSyB7TmXp6y5leJN6smpvw-vzA0kUBAfd0fE",
  authDomain: "sharebite-communityfoodsharing.firebaseapp.com",
  projectId: "sharebite-communityfoodsharing",
  storageBucket: "sharebite-communityfoodsharing.firebasestorage.app",
  messagingSenderId: "685720301974",
  appId: "1:685720301974:web:5d01aa86306c643dbf2db7",
  measurementId: "G-HM2606BTNQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Firebase Authentication initialization

export default auth;