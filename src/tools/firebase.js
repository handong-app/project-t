// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADQM9w04KJntFx2-XsiIezeeHiPf9xlqs",
  authDomain: "handongmeet.firebaseapp.com",
  projectId: "handongmeet",
  storageBucket: "handongmeet.appspot.com",
  messagingSenderId: "588947978810",
  appId: "1:588947978810:web:01a48102cc2aaf35a99303",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const firestore = getFirestore(app);
