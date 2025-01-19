import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserHabits } from '../../redux/habits';
import { useModal } from '../../context/Modal';
import CreateHabitModal from '../CreateHabitModal';
import HabitMenu from '../HabitMenu';
import './HomePage.css';
import EditHabitModal from '../EditHabitModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { thunkDeleteHabit } from '../../redux/habits'; 

const HomePage = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const habits = useSelector(state => state.habits.userHabits);
    const isLoading = useSelector(state => state.habits.isLoading);
    const [activeMenu, setActiveMenu] = useState(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        dispatch(getUserHabits());
    }, [dispatch]);

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
                left: rect.right + 20 // 20px offset from the habit item
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
                {/* Progress bars remain the same */}
                
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
                <div className="habit-item">
                    <span className="habit-name">{habit.name}</span>
                    <span className="habit-count">×{habit.streak}</span>
                    <button 
                        className="habit-menu-button"
                        onClick={(e) => toggleMenu(habit.id, e)}
                    >
                        •••
                    </button>
                </div>
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