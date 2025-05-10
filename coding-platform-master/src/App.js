import React from "react";
import MainPage from "./pages/MainPage";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { getApiData } from "./api/getApiData";
import { AppLayout } from "./layout/AppLayout";
import { QuizResults } from "./components/QuizResults";
import { Test } from "./pages/Test";
import Exam from "./components/Exam";
import { AptitudeQuiz } from "./pages/AptitudeQuiz";
import { AptitudeTopics } from "./pages/AptitudeTopics";
import Response from "./components/Response";
import Results from "./components/Results";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import SetQuestions from "./components/SetQuestions";
import Candidates from "./components/Candidates";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/aptitude",
          element: <AptitudeTopics />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/candidates",
          element: <Candidates />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/set-questions",
          element: <SetQuestions />,
        },
        {
          path: "/aptitude/quiz",
          element: <AptitudeQuiz />,
          loader: ({ request }) => {
            const url = new URL(request.url);
            const category = url.searchParams.get("category");
            return getApiData(category);
          },
        },
        {
          path: "/quiz-results",
          element: <QuizResults />,
        },
        {
          path: "/coding",
          element: <MainPage />,
        },
      ],
    },
    {
      path: "/test/*",
      element: <Test />,
    },
    {
      path: "/exam/*",
      element: <Exam />,
    },
    {
      path: "/response",
      element: <Response />,
    },
    {
      path: "/results",
      element: <Results />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
