import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/AuthContext/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../src/firebase';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format } from 'date-fns';
import '../src/App.css'

const getMonthDates = (monthOffset = 0) => {
  const now = new Date();
  now.setMonth(now.getMonth() - monthOffset);
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

const Profile = () => {
  const { user } = useAuth();
  const [taskStats, setTaskStats] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0);
useEffect(() => {
  const fetchTaskData = async () => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid); // make sure it's 'users' not 'userTasks'
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const data = snap.data();

     const transformed = (data.taskCompletionHistory || []).map(entry => ({
  date: entry.date,
  count: entry.completed, // used for coloring
  completed: entry.completed,
  total: entry.total
}));

      setTaskStats(transformed);
    }
  };

  fetchTaskData();
}, [user]);
  const { start, end } = getMonthDates(selectedMonth);

  const filtered = taskStats.filter(entry => {
    const date = new Date(entry.date);
    return date >= start && date <= end;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontWeight: 'bold' }}>
        👤 {user?.email}'s Task Completion Streak
      </h2>

      {/* Month Selector */}
      <div style={{ margin: '12px 0', display: 'flex', gap: '10px' }}>
        {[0, 1, 2, 3].map((offset) => {
          const label = format(getMonthDates(offset).start, 'MMMM yyyy');
          return (
            <button
              key={offset}
              onClick={() => setSelectedMonth(offset)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                backgroundColor: selectedMonth === offset ? '#2563eb' : '#e5e7eb',
                color: selectedMonth === offset ? '#fff' : '#000',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div
        style={{
          transform: 'scale(0.2)',       // Shrinks the chart size
          transformOrigin: 'top left',   // Aligns scaling to top-left corner
          overflowX: 'auto',             // Allows scrolling if needed
          marginTop: '20px'
        }}
      >
        <CalendarHeatmap
          startDate={start}
          endDate={end}
          values={filtered}
          classForValue={value => {
            if (!value || value.count === 0) return 'color-empty';
            if (value.count < 2) return 'color-github-1';
            if (value.count < 4) return 'color-github-2';
            if (value.count < 6) return 'color-github-3';
            return 'color-github-4';
          }}
          tooltipDataAttrs={value => ({
            'data-tip': `${value?.count || 0} tasks completed on ${value?.date}`
          })}
          showWeekdayLabels={true}
        />
      </div>

    </div>
  );
};

export default Profile;
