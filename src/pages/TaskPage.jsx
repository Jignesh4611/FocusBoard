// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useAuth } from '../AuthContext/AuthContext';
import {
  saveTasksByDate,
  getTasksByDate
} from '../../services/taskservice';
import { markTaskComplete } from '../utils/markTaskComplete ';
import { updateDailyTaskStats } from '../utils/updateDailyTaskStats';

const TaskPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const isToday = dayjs().isSame(selectedDate, 'day');

  useEffect(() => {
    if (!user || !selectedDate) return;
    getTasksByDate(user.uid, selectedDate).then(setTasks);
  }, [user, selectedDate]);

  const handleAddTask = async () => {
    if (!taskInput.trim()) return;
    const updated = [
      ...tasks,
      { task: taskInput.trim(), completed: false, createdAt: new Date() }
    ];
    setTasks(updated);
    await saveTasksByDate(user.uid, selectedDate, updated);
    setTaskInput('');
  };

  const handleToggle = async (idx) => {
    const justCompleted = !tasks[idx].completed;

    const updated = tasks.map((t, i) =>
      i === idx ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    await saveTasksByDate(user.uid, selectedDate, updated);

    if (justCompleted) {
      await markTaskComplete(user.uid, selectedDate);
    }

    await updateDailyTaskStats(user.uid, selectedDate, updated);
  };

  const handleDelete = async (idx) => {
    const updated = tasks.filter((_, i) => i !== idx);
    setTasks(updated);
    await saveTasksByDate(user.uid, selectedDate, updated);
    await updateDailyTaskStats(user.uid, selectedDate, updated);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        📝 Tasks for {selectedDate}
      </h2>

      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={{
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '20px',
          width: '100%'
        }}
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Add new task…"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          disabled={!isToday}
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          onClick={handleAddTask}
          disabled={!isToday}
          style={{
            padding: '10px 16px',
            backgroundColor: isToday ? '#007bff' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: isToday ? 'pointer' : 'not-allowed'
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
                disabled={!isToday}
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
              disabled={!isToday}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#d00',
                cursor: isToday ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => updateDailyTaskStats(user.uid, selectedDate, tasks)}
        disabled={!isToday}
        style={{
          marginTop: '16px',
          padding: '10px 16px',
          backgroundColor: isToday ? '#28a745' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: isToday ? 'pointer' : 'not-allowed'
        }}
      >
        ✅ Finish Day & Save Progress
      </button>
    </div>
  );
};

export default TaskPage;
