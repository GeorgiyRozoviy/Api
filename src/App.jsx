import Layout from "./routes/layout";
import Login from "./routes/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        // loader:,
        element: <Login />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
