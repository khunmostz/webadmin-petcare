import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "../store/store";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (

    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StyledEngineProvider>

  );
}

export default MyApp;
