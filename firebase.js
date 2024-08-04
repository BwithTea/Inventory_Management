// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb3XeEtSZw8coQXqRz0T0lRWBIyg1vgHU",
  authDomain: "inventory-management-418ef.firebaseapp.com",
  projectId: "inventory-management-418ef",
  storageBucket: "inventory-management-418ef.appspot.com",
  messagingSenderId: "14392479572",
  appId: "1:14392479572:web:15b8908bb4e171c0c202c1",
  measurementId: "G-YEQMCGXNKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}