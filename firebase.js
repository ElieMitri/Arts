// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDoYOpSZDVYlUwqUGlOKfdEl9DxqhReigQ",
    authDomain: "insta-335d5.firebaseapp.com",
    projectId: "insta-335d5",
    storageBucket: "insta-335d5.appspot.com",
    messagingSenderId: "194707915846",
    appId: "1:194707915846:web:f0e281cc3eb43f07fa7647"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const auth = getAuth();  
const storage = getStorage(app);
export default storage;

export {db}