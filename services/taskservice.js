// src/services/taskService.js

import { db } from '../src/firebase';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// 📅 Save tasks for a specific date (overwrites all tasks for that day)
export const saveTasksByDate = async (userId, date, tasks) => {
  const ref = doc(db, 'users', userId, 'tasksByDate', date);
  await setDoc(ref, { tasks });
};

// 📅 Get tasks for a specific date
export const getTasksByDate = async (userId, date) => {
  const ref = doc(db, 'users', userId, 'tasksByDate', date);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    return snap.data().tasks;
  }
  return [];
};

// 📥 Add task to "tasks" collection
export const addTask = async (taskText, userId) => {
  const ref = collection(db, 'tasks');
  await addDoc(ref, {
    task: taskText,
    completed: false,
    uid: userId,
    createdAt: new Date()
  });
};

// 📤 Get all tasks for a user (realtime)
export const getTasks = (userId, callback) => {
  const ref = collection(db, 'tasks');
  const q = query(ref, where('uid', '==', userId));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(tasks);
  });

  return unsubscribe;
};

// ✅ Toggle completion
export const toggleTask = async (taskId, currentStatus) => {
  const ref = doc(db, 'tasks', taskId);
  await updateDoc(ref, {
    completed: !currentStatus
  });
};

// ❌ Delete task
export const deleteTask = async (taskId) => {
  const ref = doc(db, 'tasks', taskId);
  await deleteDoc(ref);
};
