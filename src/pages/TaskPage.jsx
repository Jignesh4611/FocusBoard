// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '../AuthContext/AuthContext';
import {
  saveTasksByDate,
  getTasksByDate
} from '../../services/taskservice';
import { markTaskComplete } from '../utils/markTaskComplete ';

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
    const justCompleted = !tasks[idx].completed;

    const updated = tasks.map((t, i) =>
      i === idx ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await saveTasksByDate(user.uid, today, updated);

    if (justCompleted) {
      await markTaskComplete(user.uid, today);
    }
  };

  const handleDelete = async (idx) => {
    const updated = tasks.filter((_, i) => i !== idx);
    setTasks(updated);
    await saveTasksByDate(user.uid, today, updated);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        📝 Tasks for {today}
      </h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add new task…"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleAddTask}
          style={{
            padding: '10px 16px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((t, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f2f2f2',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => handleToggle(idx)}
              />
              <span style={{
                textDecoration: t.completed ? 'line-through' : 'none',
                color: t.completed ? '#888' : '#000'
              }}>
                {t.task}
              </span>
            </label>
            <button
              onClick={() => handleDelete(idx)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#d00',
                cursor: 'pointer',
                fontSize: '16px'
              }}
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
