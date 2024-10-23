import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="text-xl btn btn-ghost">👩‍💻 DevTinder</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control"></div>
        <div>
          <p>Welcome, <span className="font-bold">{user.firstName}</span></p>
        </div>
        {user && (
          <div className="mx-4 dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Profile pic" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
