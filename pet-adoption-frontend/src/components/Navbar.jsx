import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm px-8 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700"
      >
        🐾 PetAdopt
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            {user?.role === "admin" ? (
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                My Applications
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
