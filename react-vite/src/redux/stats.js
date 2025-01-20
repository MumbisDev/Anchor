const LOAD_STATS = "stats/LOAD_STATS";
const UPDATE_STATS = "stats/UPDATE_STATS";

const loadStats = (stats) => ({
  type: LOAD_STATS,
  payload: stats,
});

const updateStats = (stats) => ({
  type: UPDATE_STATS,
  payload: stats,
});

export const getUserStats = () => async (dispatch, getState) => {
  try {
    const userId = getState().session.user.id;
    const response = await fetch(`/api/stats/user/${userId}`, {
      credentials: "include",
    });

    if (response.ok) {
      const stats = await response.json();
      dispatch(loadStats(stats));
      return stats;
    }
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

export const updateUserStats = (statsData) => async (dispatch, getState) => {
  try {
    const userId = getState().session.user.id;
    const response = await fetch(`/api/stats/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(statsData),
      credentials: "include",
    });

    if (response.ok) {
      const stats = await response.json();
      dispatch(updateStats(stats));
      return stats;
    }
  } catch (error) {
    console.error("Error updating stats:", error);
  }
};

const initialState = {
  stats: null,
  isLoading: false,
  error: null,
};

const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_STATS:
      return {
        ...state,
        stats: action.payload,
        isLoading: false,
        error: null,
      };
    case UPDATE_STATS:
      return {
        ...state,
        stats: action.payload,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default statsReducer;
