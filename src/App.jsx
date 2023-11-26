import UserContextProvider from "./components/UserContextProvider";
import Home from "./routes/Home";
import Login from "./routes/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  }
]);

export default function App() {
  return (
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
  )
}
