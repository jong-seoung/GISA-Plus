import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./components/navbar/TopNav";
import { StatusProvider } from "./contexts/StatusContext";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import ProblemDetail from "./pages/problem/ProblemDetail";
import ProblemList from "./pages/problem/ProblemList";
import RestoreDetial from "./pages/restore/RestoreDetail";
import RestoreList from "./pages/restore/RestoreList";
import DailyQuiz from "./pages/dailyQuiz/DailyQuiz";
import SaveListQuiz from "./pages/saveQuiz/SaveListQuiz";
import SaveDetailQuiz from "./pages/saveQuiz/SaveDetailQuiz";
import CategoryList from "./pages/category/CategoryList";
import CategoryDetail from "./pages/category/CategoryDetail";
import CategoryManager from "./pages/dailyQuiz/QuizManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopNav />
        <Container>
          <Outlet />
        </Container>
      </>
    ),
    children: [
      { path: "", element: <CategoryList /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: ":categoryName", element: <CategoryDetail /> },
      { path: ":categoryName/daily", element: <DailyQuiz /> },
      {
        path: ":categoryName/save",
        element: <SaveListQuiz />,
      },
      { path: ":categoryName/save/:quizId", element: <SaveDetailQuiz /> },
      { path: ":categoryName/problem/", element: <ProblemList /> },
      { path: ":categoryName/problem/:version", element: <ProblemDetail /> },
      { path: ":categoryName/실기/", element: <RestoreList /> },
      { path: ":categoryName/실기/:version", element: <RestoreDetial /> },
      { path: ":categoryName/quiz/manager", element: <CategoryManager /> },
    ],
  },
]);

function App() {
  return (
    <StatusProvider>
      <RouterProvider router={router} />
    </StatusProvider>
  );
}

export default App;
