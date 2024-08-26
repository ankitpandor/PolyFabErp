const firebase = require('firebase');


const firebaseConfig = {
    apiKey: "AIzaSyCKdQmsCrmoE3Ba2Qy4o6IClju26aPbJmI",
    authDomain: "polyfaberp-cff10.firebaseapp.com",
    projectId: "polyfaberp-cff10",
    storageBucket: "polyfaberp-cff10.appspot.com",
    messagingSenderId: "892287632075",
    appId: "1:892287632075:web:54ca101f10241168d2514e",
    measurementId: "G-24G8YBW804"
  };

firebase.initializeapp  (firebaseConfig);
const db = firebase.firestore();
const User = db.collection("Users");
module.exports = User;