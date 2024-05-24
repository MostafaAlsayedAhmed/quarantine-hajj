// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtFRQKuOrq04kkP3xbc6FTQZ794rFXs3s",
  authDomain: "hajjtours-2024.firebaseapp.com",
  databaseURL: "https://hajjtours-2024-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hajjtours-2024",
  storageBucket: "hajjtours-2024.appspot.com",
  messagingSenderId: "918709880512",
  appId: "1:918709880512:web:0563207369a4a845f20f25",
  measurementId: "G-CGRQP6MDYG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); 

// console.log(firebaseApp);
export default firebaseApp