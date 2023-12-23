<<<<<<< HEAD:organize/src/firebase.js
import { initializeApp } from 'firebase/app';
=======
import firebase from 'firebase/app';
>>>>>>> fb73d72114bde23bff100a628e691ff3feefdad0:src/firebase.js
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-hZEJ8SfGXHFWOYqnJOxxiqPMSx4Z_wY",
    authDomain: "organize-2d01b.firebaseapp.com",
    projectId: "organize-2d01b",
    storageBucket: "organize-2d01b.appspot.com",
    messagingSenderId: "1017854213222",
    appId: "1:1017854213222:web:8673e084c4f5af0657c1a7",
    measurementId: "G-HHFYR0PBN7"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default {
    firebase,
  };