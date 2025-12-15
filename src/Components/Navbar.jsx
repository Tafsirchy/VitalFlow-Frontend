import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/image.png";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
        navigate("/"); // optional redirect
      })
      .catch((error) => console.error(error));
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-[#A3B18A] text-white font-semibold"
      : "hover:bg-[#A3B18A]/20";

  return (
    <nav className="bg-[#0e2d43] shadow-md">
      <div className="navbar w-11/12 mx-auto">
        {/* -------- Left Section -------- */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              ☰
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-52 rounded-box bg-white text-[#043915] font-semibold shadow"
            >
              <li>
                <NavLink to="/donation-requests" className={navLinkStyle}>
                  Donation Requests
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to="/funding" className={navLinkStyle}>
                    Funding
                  </NavLink>
                </li>
              )}

              {!user && (
                <li>
                  <NavLink to="/auth/login" className={navLinkStyle}>
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold text-white">
              Donation Platform
            </span>
          </Link>
        </div>

        {/* -------- Center Section (Desktop) -------- */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 text-white">
            <li>
              <NavLink to="/donation-requests" className={navLinkStyle}>
                Donation Requests
              </NavLink>
            </li>

            {user && (
              <li>
                <NavLink to="/funding" className={navLinkStyle}>
                  Funding
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        {/* -------- Right Section -------- */}
        <div className="navbar-end gap-3">
          {!user ? (
            <Link
              to="/auth/login"
              className="btn bg-[#A3B18A] text-[#043915] hover:bg-white"
            >
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/9ZQZQZQ/user.png"}
                  alt="User"
                  className="w-9 h-9 rounded-full border"
                />
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 w-40 rounded-box bg-white shadow text-[#043915]"
              >
                <li>
                  <Link to="/dashboard/main">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-600 font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
