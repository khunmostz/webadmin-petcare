import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";
import React from "react";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = React.useState(false);

  React.useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={8000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            pauseOnVisibilityChange
            closeOnClick
            pauseOnHover
          />
        </Provider>
      </StyledEngineProvider>
    );
  }
}

export default MyApp;
