import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import CreateHabitModal from '../CreateHabitModal';
import HabitMenu from '../HabitMenu';
import './HomePage.css';
import EditHabitModal from '../EditHabitModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { thunkDeleteHabit, getUserHabits, thunkUpdateHabit } from '../../redux/habits';
import { getUserStats, updateUserStats } from '../../redux/stats';
import { debounce } from 'lodash';

// ProgressBar Component
const ProgressBar = ({ value, total, text }) => {
    const percentage = Math.min((value / total) * 100, 100);

    return (
        <div className="progress-bar">
            <span className="progress-text">{text}</span>
            <div
                className="progress-fill"
                style={{
                    transform: `translateX(${percentage - 100}%)`,
                }}
            />
        </div>
    );
};

// CurrentDate Component
const CurrentDate = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const day = currentTime.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDay = currentTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const year = currentTime.getFullYear();
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div className="current-date">
            <div className="date">
                {day} | {monthDay} | {year}
            </div>
            <div className="time">{formattedTime}</div>
        </div>
    );
};

// HabitItem Component
const HabitItem = ({ habit, onMenuClick, activeMenu, onComplete, isButtonDisabled, setIsButtonDisabled }) => {
    const dispatch = useDispatch();
    const [isCompleted, setIsCompleted] = useState(() => {
        const storedCompletion = localStorage.getItem(`habit_${habit.id}_completion`);
        if (storedCompletion) {
            const { date, completed } = JSON.parse(storedCompletion);
            const today = new Date().toDateString();
            return date === today && completed;
        }
        return false;
    });

    const isHabitActiveToday = () => {
        const todayIndex = new Date().getDay();
        return habit.active_days[todayIndex] === '1';
    };

    const handleClick = async (e) => {
        if (!e.target.closest('.habit-menu-button') && !isButtonDisabled) {
            if (!isHabitActiveToday()) {
                alert('This habit is not active today.');
                return;
            }
            setIsButtonDisabled(true); // Disable all buttons
            const newCompletedState = !isCompleted;
            const newStreak = newCompletedState ? habit.streak + 1 : Math.max(0, habit.streak - 1);

            setIsCompleted(newCompletedState);

            const today = new Date().toDateString();
            localStorage.setItem(`habit_${habit.id}_completion`, JSON.stringify({
                date: today,
                completed: newCompletedState
            }));

            try {
                // Only send minimal required data
                await dispatch(thunkUpdateHabit(habit.id, {
                    streak: newStreak,
                    completed: newCompletedState
                }));

                await onComplete(newCompletedState);
            } catch (error) {
                console.error('Error updating habit:', error);
                // Revert UI state if backend update fails
                setIsCompleted(!newCompletedState);
                localStorage.setItem(`habit_${habit.id}_completion`, JSON.stringify({
                    date: today,
                    completed: !newCompletedState
                }));
            } finally {
                setTimeout(() => setIsButtonDisabled(false), 50); // Re-enable all buttons after 500ms
            }
        }
    };

    return (
        <div
            className={`habit-item ${isCompleted ? 'completed' : ''}`}
            onClick={handleClick}
        >
            <span className="habit-name">{habit.name}</span>
            <span className="habit-count">×{habit.streak}</span>
            <button
                className="habit-menu-button"
                onClick={(e) => {
                    e.stopPropagation();
                    onMenuClick(e);
                }}
                disabled={isButtonDisabled} // Disable the menu button as well
            >
                •••
            </button>
        </div>
    );
};

const HomePage = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const habits = useSelector(state => state.habits.userHabits);
    const isLoading = useSelector(state => state.habits.isLoading);
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state variable

    const stats = useSelector(state => state.stats?.stats) || {
        level: 1,
        xp: 0,
        compound_meter: 0,
        total_habits_completed: 0
    };

    useEffect(() => {
        if (!stats || Object.keys(stats).length === 0) {
            dispatch(getUserStats());
        }
    }, [dispatch, stats]); // Ensure stats are only fetched if not already present

    useEffect(() => {
        if (!habits || habits.length === 0) {
            dispatch(getUserHabits());
        }
    }, [dispatch, habits]); // Ensure habits are only fetched if not already present

    const handleHabitComplete = async (isCompleting) => {
        const xpPerHabit = 50;
        const compoundIncrement = 0.5;

        // Optimistically update the state on the frontend
        const newXp = Math.max(0, stats.xp + (isCompleting ? xpPerHabit : -xpPerHabit));
        const newLevel = Math.floor(newXp / 1000) + 1;

        const newStats = {
            total_habits_completed: Math.max(0, stats.total_habits_completed + (isCompleting ? 1 : -1)),
            compound_meter: Math.max(0, stats.compound_meter + (isCompleting ? compoundIncrement : -compoundIncrement)),
            xp: newXp,
            level: newLevel,
        };

        // Update the frontend state immediately
        dispatch(updateUserStats(newStats));

        // Send the updated values to the backend
        try {
            await dispatch(updateUserStats(newStats));
        } catch (error) {
            console.error('Error updating stats:', error);
            // Optionally, revert the frontend state if the backend update fails
        }
    };

    const openCreateHabitModal = () => {
        setModalContent(<CreateHabitModal />);
    };

    const toggleMenu = (habitId, e) => {
        e.stopPropagation();
        if (activeMenu === habitId) {
            setActiveMenu(null);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const menuWidth = 200; // Assume the menu width is 200px

            const left = rect.right + menuWidth > windowWidth ? rect.left - menuWidth : rect.right + 20;
            const top = windowWidth <= 768 ? rect.bottom + 10 : rect.top;
            setMenuPosition({
                top: top,
                left: left
            });
            setActiveMenu(habitId);
        }
    };

    const handleEdit = (habit) => {
        setModalContent(<EditHabitModal habit={habit} />);
        setActiveMenu(null);
    };

    const handleDelete = (habit) => {
        setActiveMenu(null);
        setModalContent(
            <DeleteConfirmationModal
                habit={habit}
                onDelete={confirmDelete}
            />
        );
    };

    const confirmDelete = async (habitId) => {
        try {
            await dispatch(thunkDeleteHabit(habitId));
        } catch (error) {
            console.error('Error deleting habit:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = () => setActiveMenu(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="home-container">
            <CurrentDate /> {/* Add the CurrentDate component */}
            <main className="main-content">
                {/* Level Progress */}
                <div className="progress-container">
                    <ProgressBar
                        value={stats.xp - ((stats.level - 1) * 1000)}
                        total={1000}
                        text={`Level ${stats.level} - ${(stats.xp - ((stats.level - 1) * 1000))} / 1000 XP`}
                    />
                </div>

                {/* Compound Rate */}
                <div className="progress-container">
                    <ProgressBar
                        value={stats.compound_meter || 0}
                        total={100}
                        text={`Compound Improvement: ${((stats.compound_meter || 0)).toFixed(1)}%`}
                    />
                </div>

                {/* Habits Container */}
                <div className="habits-container">
                    <div className="habits-header">
                        <h2>Active Habits</h2>
                        <button className="add-habit-btn" onClick={openCreateHabitModal} disabled={isButtonDisabled}>
                            <span>+</span>
                        </button>
                    </div>

                    <div className="habits-list">
                        {Array.isArray(habits) && habits.length > 0 ? (
                            habits.map(habit => (
                                <div key={habit.id} className="habit-item-container">
                                    <HabitItem
                                        habit={habit}
                                        onMenuClick={(e) => toggleMenu(habit.id, e)}
                                        activeMenu={activeMenu}
                                        onComplete={async (isCompleting) => {
                                            if (!isButtonDisabled) {
                                                setIsButtonDisabled(true);
                                                await handleHabitComplete(isCompleting);
                                                setTimeout(() => setIsButtonDisabled(false), 50); // 500ms delay
                                            }
                                        }}
                                        isButtonDisabled={isButtonDisabled} // Pass the state variable
                                        setIsButtonDisabled={setIsButtonDisabled} // Pass the state setter
                                    />
                                    {activeMenu === habit.id && (
                                        <HabitMenu
                                            onEdit={() => handleEdit(habit)}
                                            onDelete={() => handleDelete(habit)}
                                            style={{ top: menuPosition.top, left: menuPosition.left }}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-habits-message">
                                No habits created yet. Click the + button to add one!
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;