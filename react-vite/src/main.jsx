import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import { ModalProvider, Modal } from "./context/Modal";
import * as sessionActions from "./redux/session";
import "./index.css";

// Configure Redux store with middleware and dev tools support
const store = configureStore();

// Root DOM element selector
const ROOT_ELEMENT_ID = "root";

function Root() {
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    // Initialize user authentication state on app startup
    store.dispatch(sessionActions.thunkAuthenticate())
      .then(() => setIsAppLoaded(true));
  }, []);

  return (
    <>
      {/* Render app only after authentication check completes */}
      {isAppLoaded && (
        <ReduxProvider store={store}>
          <ModalProvider>
            <RouterProvider router={router} />
            <Modal />
          </ModalProvider>
        </ReduxProvider>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById(ROOT_ELEMENT_ID)).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);