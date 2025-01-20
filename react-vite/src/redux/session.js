// redux/session.js
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const thunkAuthenticate = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/", {
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return data;
    } else {
      dispatch(removeUser());
      return null;
    }
  } catch (error) {
    dispatch(removeUser());
    return null;
  }
};

export const thunkLogin = (credentials) => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      await dispatch(thunkAuthenticate());
      window.location.href = "/home";
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      await dispatch(thunkAuthenticate());
      window.location.href = "/home";
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkLogout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    credentials: "include",
  });
  dispatch(removeUser());
};

export const thunkUpdateUser = (userId, userData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return null;
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  } catch (error) {
    return { server: "Something went wrong. Please try again" };
  }
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
