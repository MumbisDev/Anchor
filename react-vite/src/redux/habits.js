const LOAD_USER_HABITS = "habits/LOAD_USER_HABITS";
const ADD_HABIT = "habits/ADD_HABIT";
const UPDATE_HABIT = "habits/UPDATE_HABIT";
const REMOVE_HABIT = "habits/REMOVE_HABIT";
const TOGGLE_HABIT_COMPLETION = "habits/TOGGLE_HABIT_COMPLETION";

// Action Creators
const loadHabits = (habits) => ({
  type: LOAD_USER_HABITS,
  payload: habits,
});

export const addHabit = (habit) => ({
  type: ADD_HABIT,
  payload: habit,
});

const updateHabit = (habit) => ({
  type: UPDATE_HABIT,
  payload: habit,
});

const removeHabit = (habitId) => ({
  type: REMOVE_HABIT,
  payload: habitId,
});

const toggleHabitCompletion = (habitId, completed) => ({
  type: TOGGLE_HABIT_COMPLETION,
  payload: { habitId, completed },
});

// Thunks
export const thunkToggleHabit =
  (habitId, currentlyCompleted) => async (dispatch, getState) => {
    try {
      const userId = getState().session.user.id;
      const currentStats = getState().stats.stats || { streak: 0 };

      // Calculate new streak
      const newStreak = !currentlyCompleted
        ? currentStats.streak + 1
        : Math.max(0, currentStats.streak - 1);

      // First update the habit
      const response = await fetch(`/api/habits/${habitId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !currentlyCompleted }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update habit");
      }

      const updatedHabit = await response.json();

      // Then update stats with new streak
      const statsResponse = await fetch(`/api/stats/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentStats,
          streak: newStreak,
        }),
        credentials: "include",
      });

      if (!statsResponse.ok) {
        throw new Error("Failed to update stats");
      }

      const updatedStats = await statsResponse.json();

      // Update both reducers
      dispatch(toggleHabitCompletion(habitId, !currentlyCompleted));
      dispatch(updateStats(updatedStats));

      return { habit: updatedHabit, stats: updatedStats };
    } catch (error) {
      console.error("Error toggling habit:", error);
      throw error;
    }
  };

export const getUserHabits = () => async (dispatch, getState) => {
  try {
    const userId = getState().session.user.id;
    const response = await fetch(`/api/habits/user/${userId}`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(loadHabits(data.habits));
      return data.habits;
    }
  } catch (error) {
    console.error("Error fetching habits:", error);
  }
};

export const createHabit = (habitData) => async (dispatch, getState) => {
  try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitData),
      credentials: "include",
    });

    if (response.ok) {
      const newHabit = await response.json();
      // After creating a habit, fetch all habits again to ensure state is in sync
      dispatch(getUserHabits());
      return newHabit;
    }
  } catch (error) {
    console.error("Error creating habit:", error);
    throw error;
  }
};

export const thunkUpdateHabit = (habitId, habitData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(habitData),
    });

    if (!response.ok) {
      throw new Error('Failed to update habit');
    }

    const updatedHabit = await response.json();

    console.log('Updated habit from server:', updatedHabit); // Debugging log

    dispatch({
      type: 'habits/UPDATE_HABIT',
      payload: updatedHabit,
    });
  } catch (error) {
    console.error('Error in thunkUpdateHabit:', error);
  }
};

export const thunkDeleteHabit = (habitId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      dispatch({
        type: REMOVE_HABIT,
        payload: habitId,
      });
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting habit:", error);
    throw error;
  }
};

const initialState = {
  userHabits: [],
  isLoading: false,
  error: null,
};
// Reducer
const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER_HABITS:
      return {
        ...state,
        userHabits: action.payload || [],
        isLoading: false,
        error: null,
      };
    case ADD_HABIT:
      return {
        ...state,
        userHabits: [...(state.userHabits || []), action.payload],
      };
    case UPDATE_HABIT:
      return {
        ...state,
        userHabits: state.userHabits.map((habit) =>
          habit.id === action.payload.id ? action.payload : habit
        ),
      };
    case REMOVE_HABIT:
      return {
        ...state,
        userHabits: state.userHabits.filter(
          (habit) => habit.id !== action.payload
        ),
      };
    case TOGGLE_HABIT_COMPLETION:
      return {
        ...state,
        userHabit: state.userHabits.map((habit) =>
          habit.id === action.payload.habitId
            ? { ...habit, completed: action.payload.completed }
            : habit
        ),
      };
    default:
      return state;
  }
};

export default habitsReducer;
