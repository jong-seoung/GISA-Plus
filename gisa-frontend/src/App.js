import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./components/TopNav";
import CategoryList from "./components/CategoryList"
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
          <hr />
          <CategoryList />
        </Container>
      </>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup />}
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
