import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const updateDailyTaskStats = async (uid, date, tasks = []) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  const completedCount = tasks.filter(t => t.completed).length;

  if (!userSnap.exists()) return;

  const userData = userSnap.data();
  const history = userData.taskCompletionHistory || [];

  const updated = history.filter(entry => entry.date !== date);
  updated.push({ date, count: completedCount });

  await setDoc(userRef, {
    ...userData,
    taskCompletionHistory: updated
  });
};
