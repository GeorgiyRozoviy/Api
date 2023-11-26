import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function Layout() {

  return (
    <div>
      <header className="flex">
        <NavLink
          to="/main"
          className={""}
          end={true}
        >
          main
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
