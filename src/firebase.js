import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgVuXanuDklmZLly77Gs3mX08yyrIkOZE",
  authDomain: "auth-dashboard-31d79.firebaseapp.com",
  projectId: "auth-dashboard-31d79",
  storageBucket: "auth-dashboard-31d79.appspot.com",
  messagingSenderId: "1008898249873",
  appId: "1:1008898249873:web:3447d99eefa4f573409b30",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
