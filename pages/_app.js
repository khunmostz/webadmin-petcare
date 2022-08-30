import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";
import React from "react";

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
        </Provider>
      </StyledEngineProvider>
    );
  }
}

export default MyApp;
