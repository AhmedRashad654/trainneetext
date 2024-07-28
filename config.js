// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHqQy6mFQ7yRukI0cdw7IinJL9vd_XQo8",
  authDomain: "testtwo-88b1b.firebaseapp.com",
  projectId: "testtwo-88b1b",
  storageBucket: "testtwo-88b1b.appspot.com",
  messagingSenderId: "847869753556",
  appId: "1:847869753556:web:9b8bb23f1972ca0a3c2341",
  measurementId: "G-NK2BNS0ZRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore( app );
const analytics =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;
const storage = getStorage(app);
export { app, db, storage, analytics };
