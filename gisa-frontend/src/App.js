import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Container } from "react-bootstrap";

import TopNav from "./components/TopNav";
import { StatusProvider } from "./contexts/StatusContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <TopNav />
        <Container>
          <Outlet />
          <hr />
        </Container>
      </>
    ),
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
