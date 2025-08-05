import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase";

export const markTaskComplete = async (userId, completedCount) => {
  const today = new Date().toISOString().split('T')[0];
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    taskCompletionHistory: arrayUnion({ date: today, count: completedCount })
  });
};
