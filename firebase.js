import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBbqEDOnkIw4MzW1v9aD5MQlUx6mqw1oXk",
    authDomain: "task-95f5b.firebaseapp.com",
    projectId: "task-95f5b",
    storageBucket: "task-95f5b.appspot.com",
    messagingSenderId: "743750297756",
    appId: "1:743750297756:web:e3aa57b059bd24d931a559",
    measurementId: "G-ECNZBVL0KE"
  };

  firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export default firebase;