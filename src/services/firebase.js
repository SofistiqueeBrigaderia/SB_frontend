import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA4AG4jJ-KmzPJADMt75RxP4irGK9ZVzzo",
  authDomain: "sofistiquee-brigaderia.firebaseapp.com",
  databaseURL: "https://sofistiquee-brigaderia-default-rtdb.firebaseio.com",
  projectId: "sofistiquee-brigaderia",
  storageBucket: "sofistiquee-brigaderia.appspot.com",
  messagingSenderId: "1006903018440",
  appId: "1:1006903018440:web:84cab9101374291bd776fd",
  measurementId: "G-DFRY4SYFHF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
