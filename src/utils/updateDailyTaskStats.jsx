import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateDailyTaskStats = async (uid, date, tasks = []) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) return;

  const completedCount = tasks.filter(t => t.completed).length;
  const userData = userSnap.data();
  const history = userData.taskCompletionHistory || [];

  // Remove old record for same date
  const updated = history.filter(entry => entry.date !== date);
  updated.push({ date, count: completedCount });

  await updateDoc(userRef, {
    taskCompletionHistory: updated
  });
};
