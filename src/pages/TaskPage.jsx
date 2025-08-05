// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '../AuthContext/AuthContext';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";
import { db } from "../firebase";

const TaskPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const isToday = dayjs().isSame(selectedDate, 'day');

  // 🔹 Fetch tasks from Firestore
  const fetchTasks = async () => {
    if (!user) return;
    const q = query(
      collection(db, "tasks"),
      where("uid", "==", user.uid),
      where("date", "==", selectedDate)
    );
    const querySnapshot = await getDocs(q);
    const fetchedTasks = querySnapshot.docs.map(docSnap => ({
      id: docSnap.id,
      ...docSnap.data()
    }));
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, [user, selectedDate]);

  // 🔹 Add a task
  const handleAddTask = async () => {
    if (!taskInput.trim()) return;

    const newTask = {
      text: taskInput,
      completed: false,
      date: selectedDate,
      uid: user.uid
    };

    try {
      await addDoc(collection(db, "tasks"), newTask);
      setTaskInput("");
      fetchTasks(); // refresh
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 🔹 Toggle completion
  const handleToggle = async (task) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // 🔹 Delete task
  const handleDelete = async (task) => {
    try {
      await deleteDoc(doc(db, "tasks", task.id));
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>📝 Tasks for {selectedDate}</h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add new task…"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          disabled={!isToday}
          style={{ flexGrow: 1, padding: '10px' }}
        />
        <button
          onClick={handleAddTask}
          disabled={!isToday}
          style={{ padding: '10px 16px' }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((t) => (
          <li
            key={t.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: '#f2f2f2',
              marginBottom: '10px'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggle(t)}
                disabled={!isToday}
              />
              <span style={{
                textDecoration: t.completed ? 'line-through' : 'none'
              }}>
                {t.text}
              </span>
            </label>
            <button
              onClick={() => handleDelete(t)}
              disabled={!isToday}
              style={{ border: 'none', background: 'transparent', color: '#d00' }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskPage;
