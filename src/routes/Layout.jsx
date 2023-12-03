import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../components/UserContextProvider";

export default function Layout() {
  const { user, onChange } = useContext(UserContext);

  const handleLogOut = () => {
    onChange(null);
    localStorage.clear();
  };

  return (
      <div className="w-3/5 flex flex-col gap-11 m-auto">
        <header className="flex items-center justify-between h-16">
          <p>Hello, {user.name}</p>
          <div className="flex gap-7 ">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? " font-semibold" : ""
              }
            >
              About
            </NavLink>
            <NavLink
              to={`/notes/${user.id}`}
              end={true}
              className={({ isActive }) =>
                isActive ? " font-semibold" : ""
              }
            >
              Notes
            </NavLink>
            <NavLink onClick={handleLogOut}>Log out</NavLink>
          </div>
        </header>
        <main>
        <Outlet />
        </main>
        </div>
  );
}
