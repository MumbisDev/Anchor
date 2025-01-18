// habits.js
// Action Types
const LOAD_HABITS = "habits/LOAD_HABITS";
const ADD_HABIT = "habits/ADD_HABIT";
const UPDATE_HABIT = "habits/UPDATE_HABIT";
const REMOVE_HABIT = "habits/REMOVE_HABIT";

// Action Creators
const loadHabits = (habits) => ({
  type: LOAD_HABITS,
  payload: habits,
});

const addHabit = (habit) => ({
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

// Thunks
export const thunkLoadHabits = () => async (dispatch) => {
  try {
    const response = await fetch("/api/habits/user");
    if (response.ok) {
      const habits = await response.json();
      dispatch(loadHabits(habits));
      return habits;
    }
  } catch (error) {
    return { error: "Failed to load habits" };
  }
};

export const thunkCreateHabit = (habitData) => async (dispatch) => {
  try {
    const response = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitData),
    });

    if (response.ok) {
      const newHabit = await response.json();
      dispatch(addHabit(newHabit));
      return newHabit;
    }
  } catch (error) {
    return { error: "Failed to create habit" };
  }
};

export const thunkUpdateHabit = (habitId, habitData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(habitData),
    });

    if (response.ok) {
      const updatedHabit = await response.json();
      dispatch(updateHabit(updatedHabit));
      return updatedHabit;
    }
  } catch (error) {
    return { error: "Failed to update habit" };
  }
};

export const thunkDeleteHabit = (habitId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/habits/${habitId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      dispatch(removeHabit(habitId));
      return { success: true };
    }
  } catch (error) {
    return { error: "Failed to delete habit" };
  }
};

// Selectors
export const selectAllHabits = (state) => Object.values(state.habits.habits);
export const selectHabitById = (state, habitId) => state.habits.habits[habitId];

// Initial State
const initialState = {
  habits: {},
  isLoading: false,
  error: null,
};

// Reducer
const habitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HABITS: {
      const habits = {};
      action.payload.forEach((habit) => {
        habits[habit.id] = habit;
      });
      return {
        ...state,
        habits,
        isLoading: false,
        error: null,
      };
    }
    case ADD_HABIT:
      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload.id]: action.payload,
        },
      };
    case UPDATE_HABIT:
      return {
        ...state,
        habits: {
          ...state.habits,
          [action.payload.id]: {
            ...state.habits[action.payload.id],
            ...action.payload,
          },
        },
      };
    case REMOVE_HABIT: {
      const newHabits = { ...state.habits };
      delete newHabits[action.payload];
      return {
        ...state,
        habits: newHabits,
      };
    }
    default:
      return state;
  }
};

export default habitsReducer;
