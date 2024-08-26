import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./components/TopNav";
import CategoryList from "./components/CategoryList"
import CategoryDetail from "./components/CategoryDetail";
import DailyQuiz from "./components/DailyQuiz";
import { StatusProvider } from "./contexts/StatusContext";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

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
