import React, { useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import CreateHabitModal from '../CreateHabitModal';
import HabitMenu from '../HabitMenu';
import './HomePage.css';
import EditHabitModal from '../EditHabitModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { thunkDeleteHabit, getUserHabits, thunkUpdateHabit} from '../../redux/habits'; 
import { getUserStats, updateUserStats } from '../../redux/stats';

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

// HabitItem Component
const HabitItem = ({ habit, onMenuClick, activeMenu, onComplete }) => {
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

    const handleClick = async (e) => {
        if (!e.target.closest('.habit-menu-button')) {
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

    const stats = useSelector(state => state.stats?.stats) || {
        level: 1,
        xp: 0,
        compound_meter: 0,
        total_habits_completed: 0
    };

    useEffect(() => {
        dispatch(getUserStats());
        dispatch(getUserHabits());
    }, [dispatch]);

    const handleHabitComplete = async (isCompleting) => {
        const xpPerHabit = 100;
        const compoundIncrement = 0.5;

        const newStats = {
            total_habits_completed: (stats.total_habits_completed || 0) + (isCompleting ? 1 : -1),
            compound_meter: (stats.compound_meter || 0) + (isCompleting ? compoundIncrement : -compoundIncrement),
            xp: (stats.xp || 0) + (isCompleting ? xpPerHabit : -xpPerHabit),
            level: Math.floor((stats.xp || 0) / 1000) + 1,
        };

        await dispatch(updateUserStats(newStats));
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
            setMenuPosition({
                top: rect.top,
                left: rect.right + 20
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
                        <button className="add-habit-btn" onClick={openCreateHabitModal}>
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
                                        onComplete={handleHabitComplete}
                                    />
                                    {activeMenu === habit.id && (
                                        <HabitMenu 
                                            onEdit={() => handleEdit(habit)}
                                            onDelete={() => handleDelete(habit)}
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