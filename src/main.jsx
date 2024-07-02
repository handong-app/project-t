import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TestPage from "./pages/TestPage.jsx";
import SurveyPage from "./pages/SurveyPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import MainPage from "./pages/MainPage.jsx";
import LoginModule from "./components/LoginModule.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <TestPage />,
  },
  {
    path: "/main",
    element: <MainPage />,
  },
  {
    path: "/create",
    element: <CreatePage />,
  },
  {
    path: "/m/:surveyId",
    element: <SurveyPage />,
  },
]);

const theme = {
  colors: {
    purple300: "#ba68c8",
    purple400: "#ab47bc",
    purple500: "#9c27b0",
    purple600: "#8e24aa",
    purple700: "#7b1fa2",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <LoginModule>
          <RouterProvider router={router} />
        </LoginModule>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);
