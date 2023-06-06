import { initializeApp } from '@firebase/app';
import { getStorage } from '@firebase/storage';
import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC8tL8qMm987K1tJSukguYS01Ru6XLeS9c",
  authDomain: "imarketapp-84681.firebaseapp.com",
  databaseURL: "https://imarketapp-84681-default-rtdb.firebaseio.com",
  projectId: "imarketapp-84681",
  storageBucket: "imarketapp-84681.appspot.com",
  messagingSenderId: "437165689363",
  appId: "1:437165689363:web:2042b553151ea491e3cde6",
  measurementId: "G-2VL4NPB1J5"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
  
  export { firebase, storage };