import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const markTaskComplete = async (userId) => {
  const today = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    taskCompletionHistory: arrayUnion(today)
  });
};