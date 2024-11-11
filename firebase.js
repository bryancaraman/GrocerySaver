import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnExRFIRYt7nH0f4ibrQYwQ79PoL8diZ4",
  authDomain: "grocerypricer-565d8.firebaseapp.com",
  projectId: "grocerypricer-565d8",
  storageBucket: "grocerypricer-565d8.firebasestorage.app",
  messagingSenderId: "142250966082",
  appId: "1:142250966082:web:74755dee0eabdada0281db"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);