import RequireAuth from "./components/RequireAuth";
import UserContextProvider from "./components/UserContextProvider";
import SignUp from "./routes/Registration";
import Login from "./routes/login";
import Layout from "./routes/Layout";
import  Home from "./routes/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes",
        // element: <Notes />,
      },
    ],
  },
]);

export default function App() {
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}
