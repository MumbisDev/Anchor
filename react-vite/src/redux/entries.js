const LOAD_ENTRIES = "entries/LOAD_ENTRIES";
const ADD_ENTRY = "entries/ADD_ENTRY";
const UPDATE_ENTRY = "entries/UPDATE_ENTRY";
const REMOVE_ENTRY = "entries/REMOVE_ENTRY";

// Action Creators
const loadEntries = (entries) => ({
  type: LOAD_ENTRIES,
  payload: entries,
});

const addEntry = (entry) => ({
  type: ADD_ENTRY,
  payload: entry,
});

const updateEntry = (entry) => ({
  type: UPDATE_ENTRY,
  payload: entry,
});

const removeEntry = (entryId) => ({
  type: REMOVE_ENTRY,
  payload: entryId,
});

// Thunks
export const getUserEntries = () => async (dispatch, getState) => {
  try {
    const userId = getState().session.user.id;
    const response = await fetch(`/api/entries/user/${userId}`, {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      // Log the response to see its structure
      console.log("Entries response:", data);

      // Check if the entries are in a nested property
      const entries = data.entries || data;
      dispatch(
        loadEntries(Array.isArray(entries) ? entries : Object.values(entries))
      );
      return entries;
    }
  } catch (error) {
    console.error("Error fetching entries:", error);
  }
};

export const createEntry = (entryData) => async (dispatch) => {
  try {
    const response = await fetch("/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
      credentials: "include",
    });

    if (response.ok) {
      const newEntry = await response.json();
      dispatch(addEntry(newEntry));
      return newEntry;
    }
  } catch (error) {
    console.error("Error creating entry:", error);
  }
};

export const updateUserEntry = (entryId, entryData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/entries/${entryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
      credentials: "include",
    });

    if (response.ok) {
      const updatedEntry = await response.json();
      dispatch(updateEntry(updatedEntry));
      return updatedEntry;
    }
  } catch (error) {
    console.error("Error updating entry:", error);
  }
};

export const deleteEntry = (entryId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/entries/${entryId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      dispatch(removeEntry(entryId));
      return { success: true };
    }
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
};

const initialState = {
  entries: [],
  isLoading: false,
  error: null,
};

// Reducer
const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ENTRIES:
      return {
        ...state,
        entries: action.payload,
        isLoading: false,
        error: null,
      };
    case ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload, ...state.entries],
      };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map((entry) =>
          entry.id === action.payload.id ? action.payload : entry
        ),
      };
    case REMOVE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((entry) => entry.id !== action.payload),
      };
    default:
      return state;
  }
};

export default entriesReducer;
