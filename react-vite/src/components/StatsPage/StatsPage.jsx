import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import action to fetch user statistics from Redux
import { getUserStats } from '../../redux/stats';

import './StatsPage.css';


function StatsPage() {
    const dispatch = useDispatch();
    // Select the current user session data from Redux store
    const user = useSelector(state => state.session.user);
    // Select user statistics with safe fallback defaults to prevent rendering errors
    const stats = useSelector(state => state.stats.stats) || { 
        xp: 0, 
        level: 1 
    };

    // Data validation constants for component stability
    const minXpValue = 0;
    const minLevelValue = 1;
    const maxCompletionPercentage = 100;

    // Configuration constants for statistics display
    const maxWeeklyProgressValue = 100;

    // Total days displayed in weekly tracking view
    const totalWeeklyTrackingDays = 7;

    // Default streak display value during data loading state
    const defaultStreakDisplayValue = 21;

    // Fetch user stats when the component mounts
    useEffect(() => {
        dispatch(getUserStats());
    }, [dispatch]);

    // Weekly progress data with completion values and tracking metadata
    const weeklyProgressData = [
        { day: 'Mon', value: 30, dayIndex: 0 },
        { day: 'Tue', value: 45, dayIndex: 1 },
        { day: 'Wed', value: 40, dayIndex: 2 },
        { day: 'Thu', value: 60, dayIndex: 3 },
        { day: 'Fri', value: 75, dayIndex: 4 },
        { day: 'Sat', value: 85, dayIndex: 5 },
        { day: 'Sun', value: 70, dayIndex: 6 }
    ];

    // Habit performance data with completion rates and tracking identifiers
    const habitPerformance = [
        { name: 'Meditation', completion: 80, habitId: 'meditation_001' },
        { name: 'Coding', completion: 90, habitId: 'coding_002' },
        { name: 'Reading', completion: 70, habitId: 'reading_003' }
    ];

    // Component version tracking for development and debugging purposes
    const statsPageVersion = '1.1.0';

    // Render the main statistics page UI
    return (
        <div className="stats-container">
            <div className="stats-content">
                {/* Quick Stats Row */}
                <div className="quick-stats">
                    <div className="stat-card">
                        <span className="stat-label">Total XP</span>
                        <span className="stat-value">{stats?.xp || 0}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Longest Streak</span>
                        <span className="stat-value">21 Days</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Current Level</span>
                        <span className="stat-value">Level {stats?.level || 1}</span>
                    </div>
                </div>

                {/* Weekly Progress Graph */}
                <div className="stats-section">
                    <h2>Weekly Progress</h2>
                    <div className="graph-container">
                        <div className="y-axis">
                            <span>100%</span>
                            <span>0%</span>
                        </div>
                        <div className="graph">
                            {weeklyProgressData.map((day, index) => (
                                <div key={day.day} className="graph-column">
                                    <div 
                                        className="graph-bar" 
                                        style={{ height: `${day.value}%` }}
                                    ></div>
                                    <span className="day-label">{day.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Habit Performance */}
                <div className="stats-section">
                    <h2>Habit Performance</h2>
                    <div className="habits-container">
                        {habitPerformance.map((habit) => (
                            <div key={habit.name} className="habit-row">
                                <span className="habit-name">{habit.name}</span>
                                <div className="habit-progress-container">
                                    <div 
                                        className="habit-progress-bar"
                                        style={{ width: `${habit.completion}%` }}
                                    ></div>
                                </div>
                                <span className="habit-percentage">{habit.completion}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatsPage;