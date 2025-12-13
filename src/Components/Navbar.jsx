import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import logo from "../assets/image.png"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const HandleLogout = () => {
    logOut().then(() => {
      alert("User Logout Successfully");
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT - LOGO */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo} // replace with your logo
            alt="Logo"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold">VitalFlow</span>
        </Link>
      </div>

      {/* CENTER - LINKS */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/donation-requests">Donation Requests</Link>
          </li>

          {user && (
            <li>
              <Link to="/funding">Funding</Link>
            </li>
          )}
        </ul>
      </div>

      {/* RIGHT - AUTH */}
      <div className="navbar-end gap-2">
        {!user ? (
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/2Fsd9gF/avatar.png"}
                  alt="User Avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard/main">Dashboard</Link>
              </li>
              <li>
                <button onClick={HandleLogout} className="text-red-500">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
