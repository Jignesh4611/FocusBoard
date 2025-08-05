import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/AuthContext/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../src/firebase';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format } from 'date-fns';
import '/Profile.css'; // Import new CSS

// Helper: Get start and end of a given month
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
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);

    // Real-time Firestore listener
    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();

        const transformed = (data.taskCompletionHistory || []).map(entry => {
          let dateValue;

          // Convert Firestore Timestamp or string to Date
          if (entry.date?.toDate) {
            dateValue = entry.date.toDate();
          } else {
            dateValue = new Date(entry.date);
          }

          return {
            date: format(dateValue, 'yyyy-MM-dd'), // store as string for heatmap
            count: entry.completed || 0
          };
        });

        setTaskStats(transformed);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const { start, end } = getMonthDates(selectedMonth);

  // Filter for selected month
  const filtered = taskStats.filter(entry => {
    const date = new Date(entry.date);
    return date >= start && date <= end;
  });

  return (
    <div className="profile-container">
      <h2 className="profile-title">
        👤 {user?.email}'s Task Completion Streak
      </h2>

      {/* Month Selector */}
      <div className="month-selector">
        {[0, 1, 2, 3].map((offset) => {
          const label = format(getMonthDates(offset).start, 'MMMM yyyy');
          return (
            <button
              key={offset}
              onClick={() => setSelectedMonth(offset)}
              className={`month-button ${selectedMonth === offset ? 'active' : ''}`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Heatmap */}
      <div className="heatmap-wrapper">
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
