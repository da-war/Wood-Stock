// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS7BwbcN-Hr5kg2YBIwY0fInrgZdWxLYo",
  authDomain: "wood-stock-249df.firebaseapp.com",
  projectId: "wood-stock-249df",
  storageBucket: "wood-stock-249df.appspot.com",
  messagingSenderId: "469041303045",
  appId: "1:469041303045:web:9a5a99ffe9a4905f6ad66c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
