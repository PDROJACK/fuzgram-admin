import "./App.css";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import { ProtectedRoute } from "./navigation/ProtectedRoute";
import UserLoginSignUp from "./components/UserLoginSignUp";
import Verification from "./screens/Verification";
import HomePage from "./screens/Homepage";
import AuthPage from "./screens/AuthPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
// @ts-ignore
import Nerd from "./fonts/bbt.TTF";

const rootAdminRouter = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute children={<HomePage />} />,
    element: <HomePage />
  },
  {
    path: "/login",
    element: <UserLoginSignUp type={"login"} />,
  },
  {
    path: "/signup",
    element: <UserLoginSignUp type={"signup"} />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/oauth",
    element: <ProtectedRoute children={<AuthPage />} />,
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: 'Nerd',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Nerd';
          font-size: 10;
          src: local('Nerd'), local('Nerd-Regular'), url(${Nerd}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={rootAdminRouter} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
