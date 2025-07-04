// src/services/taskService.js

import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const saveTasksByDate = async (userId, date, tasks) => {
  const ref = doc(db, 'users', userId, 'tasksByDate', date);
  await setDoc(ref, { tasks });
};

export const getTasksByDate = async (userId, date) => {
  const ref = doc(db, 'users', userId, 'tasksByDate', date);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().tasks;
  }
  return [];
};

export const getTasksForWeek = async (userId, datesArray) => {
  const promises = datesArray.map(async (date) => {
    const tasks = await getTasksByDate(userId, date);
    return { date, tasks };
  });

  return Promise.all(promises);
};
