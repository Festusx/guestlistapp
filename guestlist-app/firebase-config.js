// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAjfcd8ZcwvWDGJCZ8JmtfuvmXjOjYCzPs",
  authDomain: "guestlistapp-daadb.firebaseapp.com",
  projectId: "guestlistapp-daadb",
  storageBucket: "guestlistapp-daadb.firebasestorage.app",
  messagingSenderId: "778290115922",
  appId: "1:778290115922:web:f4a81e51715d04e2f2f68b",
  measurementId: "G-T2M579KGNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);

