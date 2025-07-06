// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '../AuthContext/AuthContext';
import {
  saveTasksByDate,
  getTasksByDate
} from '../../services/taskService';

const TaskPage = () => {
  const { user } = useAuth();
  const today = dayjs().format('YYYY-MM-DD');

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    if (!user) return;
    getTasksByDate(user.uid, today).then(setTasks);
  }, [user, today]);

  const handleAddTask = async () => {
    if (!taskInput.trim()) return;
    const updated = [
      ...tasks,
      { task: taskInput.trim(), completed: false, createdAt: new Date() }
    ];
    setTasks(updated);
    await saveTasksByDate(user.uid, today, updated);
    setTaskInput('');
  };

  const handleToggle = async (idx) => {
    const updated = tasks.map((t, i) =>
      i === idx ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await saveTasksByDate(user.uid, today, updated);
  };

  const handleDelete = async (idx) => {
    const updated = tasks.filter((_, i) => i !== idx);
    setTasks(updated);
    await saveTasksByDate(user.uid, today, updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Tasks for {today}</h2>
      <div>
        <input
          type="text"
          placeholder="Add new task…"
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
        {tasks.map((t, idx) => (
          <li key={idx} style={{ marginBottom: 8 }}>
            <label style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggle(idx)}
              />{" "}
              {t.task}
            </label>
            <button
              onClick={() => handleDelete(idx)}
              style={{ marginLeft: 12 }}
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
