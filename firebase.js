// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6q2yO11mGD9CgHQOjXOR3ue55DXkGdgw",
  authDomain: "woodstock-4ab94.firebaseapp.com",
  projectId: "woodstock-4ab94",
  storageBucket: "woodstock-4ab94.appspot.com",
  messagingSenderId: "337604388424",
  appId: "1:337604388424:web:9f3d446a86fedecd4e5a7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
