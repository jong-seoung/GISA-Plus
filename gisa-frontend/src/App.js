import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./components/TopNav";
import { StatusProvider } from "./contexts/StatusContext";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import DailyQuiz from "./components/dailyQuiz/DailyQuiz";
import CategoryList from "./pages/category/CategoryList"
import CategoryDetail from "./pages/category/CategoryDetail";

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
      { path: "signup", element: <Signup />},
      { path: ":categoryName", element: <CategoryDetail />},
      { path: ":categoryName/daily", element: <DailyQuiz />}
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
