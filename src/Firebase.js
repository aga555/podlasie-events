import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'
const config = {
    apiKey: "AIzaSyBP2wZOzAGXDAVmQhsl-gqaHCD6tH83yfc",
    authDomain: "podlasie-b1f30.firebaseapp.com",
    databaseURL: "https://podlasie-b1f30.firebaseio.com",
    projectId: "podlasie-b1f30",
    storageBucket: "podlasie-b1f30.appspot.com",
    messagingSenderId: "419797329513",
    appId: "1:419797329513:web:b5f46ecc8b1e8f87b024f8",
    measurementId: "G-HTS6NCNX8H"
}

firebase.initializeApp(config);
const db = firebase.firestore();
export const firebaseAuth = firebase.auth();
