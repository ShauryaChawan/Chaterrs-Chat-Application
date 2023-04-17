import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASutI_RdBKUVoRtZcknhPMNy2l-pG1SqQ",
  authDomain: "chaters-4e02a.firebaseapp.com",
  projectId: "chaters-4e02a",
  storageBucket: "chaters-4e02a.appspot.com",
  messagingSenderId: "194733711884",
  appId: "1:194733711884:web:663af3eb1f59ed47924429"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();