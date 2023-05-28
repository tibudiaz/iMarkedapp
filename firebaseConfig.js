import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAL8p9atbqRkD8yhQK1J08ZN9F2_PKVG3Y",
    authDomain: "imarketapp-82b95.firebaseapp.com",
    databaseURL: "https://imarketapp-82b95-default-rtdb.firebaseio.com",
    projectId: "imarketapp-82b95",
    storageBucket: "imarketapp-82b95.appspot.com",
    messagingSenderId: "704943835036",
    appId: "1:704943835036:web:9be7dd354be93d63f0aa59"
  };

  const firebase = initializeApp(firebaseConfig);

export default firebase;
