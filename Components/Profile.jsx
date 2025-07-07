import React, { useEffect, useState } from 'react';
import { useAuth } from '../src/AuthContext/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../src/firebase'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { format, parseISO } from 'date-fns';

const getMonthDates = (monthOffset = 0) => {
  const now = new Date();
  now.setMonth(now.getMonth() - monthOffset);

  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { start, end };
};

const Profile = () => {
  const { user } = useAuth();
  const [loginHistory, setLoginHistory] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(0); // 0 = current month

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user) return;

      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        const history = data.loginHistory || [];
        setLoginHistory(history.map(date => ({ date })));
      }
    };

    fetchHistory();
  }, [user]);

  const { start, end } = getMonthDates(selectedMonth);
  const filtered = loginHistory
    .filter(entry => {
      const date = new Date(entry.date);
      return date >= start && date <= end;
    })
    .map(entry => ({
      date: entry.date,
      count: 1
    }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">👤 {user?.email}'s Login Streak</h2>

      {/* Month Selector */}
      <div className="flex gap-2 mb-4">
        {[0, 1, 2, 3].map((offset) => {
          const label = format(getMonthDates(offset).start, 'MMMM yyyy');
          return (
            <button
              key={offset}
              onClick={() => setSelectedMonth(offset)}
              className={`px-3 py-1 rounded ${
                selectedMonth === offset ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div style={{ transform: 'scale(0.2)', transformOrigin: 'top left', overflowX: 'auto' }}>
  <CalendarHeatmap
    startDate={start}
    endDate={end}
    values={filtered}
    classForValue={value => (value ? 'color-github' : 'color-empty')}
    tooltipDataAttrs={value => ({
      'data-tip': `Logged in: ${value?.date || 'No login'}`
    })}
  />
</div>
    </div>
  );
};

export default Profile;
