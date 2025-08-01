import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// Import action to fetch user statistics from Redux
import { getUserStats } from '../../redux/stats';

import './StatsPage.css';


function StatsPage() {
    const dispatch = useDispatch();
    // Select the current user from Redux state
    const user = useSelector(state => state.session.user);
    // Select the user's statistics from Redux state with default fallback values
    const stats = useSelector(state => state.stats.stats) || { 
        xp: 0, 
        level: 1 
    };

    // Maximum progress value for weekly graph calculations
    const maxProgressValue = 100;

    // Fetch user stats when the component mounts
    useEffect(() => {
        dispatch(getUserStats());
    }, [dispatch]);

    // This array holds the weekly progress data for the graph below
    const weeklyProgressData = [
        { day: 'Mon', value: 30 },
        { day: 'Tue', value: 45 },
        { day: 'Wed', value: 40 },
        { day: 'Thu', value: 60 },
        { day: 'Fri', value: 75 },
        { day: 'Sat', value: 85 },
        { day: 'Sun', value: 70 }
    ];

    // This array represents the performance of each habit for display
    const habitPerformance = [
        { name: 'Meditation', completion: 80 },
        { name: 'Coding', completion: 90 },
        { name: 'Reading', completion: 70 }
    ];

    // Version identifier for the StatsPage component
    const statsPageVersion = '1.0.0';

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