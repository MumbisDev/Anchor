import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createHabit } from '../../redux/habits';
import './CreateHabitModal.css';


// Days of the week used for toggling habit activity (Monday to Sunday)
const DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

const CreateHabitModal = () => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [habitName, setHabitName] = useState('');
    const [activeDays, setActiveDays] = useState(Array(7).fill(false));

    // Title displayed at the top of the modal
    const modalTitle = "Create a new habit";

    // Function to toggle the active state of a day button
    const handleDayToggle = (index) => {
        setActiveDays((prevActiveDays) => {
            const newActiveDays = [...prevActiveDays];
            newActiveDays[index] = !newActiveDays[index];
            return newActiveDays;
        });
    };

    // Function to handle form submission and create a new habit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert the boolean array to a '1010101' string
        const activeDaysString = activeDays.map(day => day ? '1' : '0').join('');
        const selectedDaysCount = activeDays.filter(Boolean).length;
        
        // Object containing all habit data to be sent to the backend
        const habitData = {
            name: habitName,
            target_frequency: selectedDaysCount || 7,
            description: `${habitName} - ${selectedDaysCount} days per week`,
            active_days: activeDaysString
        };

        // Logging habitData for inspection before dispatch
        // console.log('Habit data to be dispatched:', habitData);

        try {
            console.log('Submitting habit data:', habitData); // Debugging log
            await dispatch(createHabit(habitData));
            closeModal();
        } catch (error) {
            console.error('Error creating habit:', error);
        }
    };

    return (
        <div className="create-habit-modal">
            <h2>{modalTitle}</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Habit Name</label>
                    <input
                        type="text"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        placeholder="Enter your habit name here"
                        required
                    />
                </div>

                <div className="input-group">
                    <label>Active Days</label>
                    <div className="days-selector">
                        {DAYS.map((day, index) => (
                            <button
                                key={day}
                                type="button"
                                className={`day-button ${activeDays[index] ? 'active' : ''}`}
                                onClick={() => handleDayToggle(index)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="button-group">
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="create-button"
                    >
                        Create Habit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateHabitModal;