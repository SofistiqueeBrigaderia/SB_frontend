import {
  createGenerateClassName,
  CssBaseline,
  StylesProvider,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./Routes";

const generateClassName = createGenerateClassName({
  productionPrefix: "app-sofistiquee-fe",
  seed: "app-sofistiquee-fe",
});

const theme = createTheme({
  overrides: {
    palette: {
      primary: {
        main: "#d8a35d",
      },
      secondary: { main: "#5b352c" },
    },
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#fff",
          fontFamily: "Source Sans Pro",
          width: "100vw",
          color: "rgba(91, 53, 44, 1)",
          overflowX: "hidden",
        },
        ul: {
          listStyleType: "none",
          color: "rgba(91, 53, 44, 1)",
          margin: 0,
          padding: 0,
        },
        a: {
          textDecoration: "none",
        },
        h2: {
          fontFamily: "Source Sans Pro",
          fontStyle: "bold",
          fontSize: "25px",
          color: "#5b352c",
          lineHeight: "24px",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider generateClassName={generateClassName}>
        <Provider store={store}>
          <CssBaseline />
          <Routes />
        </Provider>
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
