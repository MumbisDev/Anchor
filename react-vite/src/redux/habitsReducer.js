// ...existing code...

const habitsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'habits/UPDATE_HABIT': {
            const updatedHabit = action.payload;
            return {
                ...state,
                userHabits: state.userHabits.map((habit) =>
                    habit.id === updatedHabit.id ? updatedHabit : habit
                ),
            };
        }
        // ...existing cases...
        default:
            return state;
    }
};

// ...existing code...