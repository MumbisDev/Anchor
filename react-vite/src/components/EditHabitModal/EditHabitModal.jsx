import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkUpdateHabit, isHabitEnabledToday } from '../../redux/habits';  // Update this import
import '../CreateHabitModal/CreateHabitModal.css'


// Array representing days of the week, starting with Sunday
const DAYS = ['Su', 'M', 'T', 'W', 'Th', 'F', 'S']; // Reordered to place Sunday first

const EditHabitModal = ({ habit }) => {
    // Debug mode flag for future debugging features
    const debugMode = false;

    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [habitName, setHabitName] = useState(habit.name);
    
    // Convert the '1010101' string to an array of booleans
    const activeDaysArray = habit.active_days ? 
        habit.active_days.split('').map(day => day === '1') :
        Array(7).fill(false);

    const [activeDays, setActiveDays] = useState(activeDaysArray);

    // Toggle the selected state for a specific day button
    const handleDayToggle = (index) => {
        setActiveDays((prevActiveDays) => {
            const newActiveDays = [...prevActiveDays];
            newActiveDays[index] = !newActiveDays[index];
            return newActiveDays;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Convert the boolean array back to a '1010101' string
        const activeDaysString = activeDays.map(day => day ? '1' : '0').join('');
        const selectedDaysCount = activeDays.filter(Boolean).length;
        
        const habitData = {
            name: habitName,
            target_frequency: selectedDaysCount || 7,
            description: `${habitName} - ${selectedDaysCount} days per week`,
            active_days: activeDaysString
        };

        console.log('Submitting updated habit data:', habitData); // Debugging log

        try {
            await dispatch(thunkUpdateHabit(habit.id, habitData)); // Ensure this action updates the state

            // Close the modal after successfully saving changes
            closeModal();
        } catch (error) {
            console.error('Error updating habit:', error);
        }
    };

    // Remove the alert logic from here
    const isHabitEnabledToday = (activeDaysString) => {
        const todayIndex = new Date().getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
        return activeDaysString[todayIndex] === '1';
    };

    return (
        <div className="create-habit-modal">
            <h2>Edit your habit</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Habit Name</label>
                    <input
                        type="text"
                        value={habitName}
                        onChange={(e) => setHabitName(e.target.value)}
                        placeholder= "Enter your habit name here"
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
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditHabitModal;