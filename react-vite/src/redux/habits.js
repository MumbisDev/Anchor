const LOAD_USER_HABITS = "habits/LOAD_USER_HABITS";
const ADD_HABIT = "habits/ADD_HABIT";
const UPDATE_HABIT = "habits/UPDATE_HABIT";
const REMOVE_HABIT = "habits/REMOVE_HABIT";

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

// Thunks
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitData),
      credentials: "include",
    });

    if (response.ok) {
      const updatedHabit = await response.json();
      dispatch(updateHabit(updatedHabit)); // Use the action creator here
      return updatedHabit;
    }
  } catch (error) {
    console.error("Error updating habit:", error);
    throw error;
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
    default:
      return state;
  }
};

export default habitsReducer;
