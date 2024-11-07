
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCL5KQ59T8BPZRhucqAdMB0rgz1U0h3nkw",
  authDomain: "olxx-7b908.firebaseapp.com",
  projectId: "olxx-7b908",
  storageBucket: "olxx-7b908.appspot.com",
  messagingSenderId: "522736693103",
  appId: "1:522736693103:web:04687d77eaba5cd5aa029a",
  measurementId: "G-8P8SQ5L8NG"
};

// Initialize Firebase
 export  const app = initializeApp(firebaseConfig);

// Export the Firebase modules you need
export const auth = getAuth(app);
export const db = getFirestore(app);

