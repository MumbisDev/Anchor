import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import { ModalProvider, Modal } from "./context/Modal";
import * as sessionActions from "./redux/session";
import "./index.css";

const store = configureStore();

function Root() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    store.dispatch(sessionActions.thunkAuthenticate())
      .then(() => setIsLoaded(true));
  }, []);

  return (
    <>
      {isLoaded && (
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);