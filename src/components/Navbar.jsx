import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import useAuth from "../hooks/UseAuth";

export default function Navbar() {
  const { user, signOutUser } = useAuth();

  const links = (
    <>
      <NavLink to="/">
        <li>Home</li>
      </NavLink>

      <NavLink to="/jobs">
        <li>All Jobs</li>
      </NavLink>
      <NavLink to="/add-jobs">
        <li>Add Jobs</li>
      </NavLink>
      <NavLink to="/my-applications">
        <li>My Applications</li>
      </NavLink>
      <NavLink to="/my-jobs">
        <li>My Jobs</li>
      </NavLink>
    </>
  );
  const handleSignOut = () => {
    signOutUser()
      .then(() => {})
      .catch((error) => {});
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-3xl font-bold">Job Portal</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleSignOut} className="btn">
            Log Out
          </button>
        ) : (
          <>
            {" "}
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
