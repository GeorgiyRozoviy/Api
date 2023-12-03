import RequireAuth from "./components/RequireAuth";
import UserContextProvider from "./components/UserContextProvider";
import SignUp from "./routes/Registration";
import Login from "./routes/login";
import Layout from "./routes/Layout";
import Home from "./routes/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Notes, { loader as notesLoader } from "./routes/Notes";
import AddNote from "./routes/AddNote";

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
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/notes",
        element: <Notes />,
        loader: notesLoader,
      },
      {
        path: "/notes/add",
        element: <AddNote />,
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
