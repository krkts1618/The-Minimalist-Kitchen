import { Link, useNavigate } from "react-router-dom";
import sun from "../assets/sun-shape-svgrepo-com.svg";
import moon from "../assets/crescent-moon-phase-svgrepo-com.svg";

export default function Navbar({ toggleBtn, darkmode, token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Clear state so App.jsx redirects to Auth screen immediately
    if (setToken) setToken(null);
    
    navigate("/");
  };

  return (
    <>
      <div className="left">
        <h1 className="tracking-wider text-xl font-bold dark:text-textPrimary text-textPrimary">
          <Link to="/">THE MINIMALIST KITCHEN</Link>
        </h1>
      </div>
      <div className="right flex items-center gap-6">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleBtn}
          className="hover:bg-lightTextSecondary/10 dark:hover:bg-darkTextSecondary/10 p-2 rounded-2xl cursor-pointer"
        >
          <img
            className={`w-10 h-8 ${!darkmode ? "" : "invert"}`}
            src={darkmode ? moon : sun}
            alt={darkmode ? "LightMode" : "DarkMode"}
          />
        </button>

        {/* Create Recipe Button (Only shown if logged in) */}
        {token && (
          <button className="bg-accentCyan transition-colors duration-300 text-darkCanvas w-10 h-10 rounded-full shadow-md hover:scale-105 flex items-center justify-center font-bold">
            <Link to="/create">+</Link>
          </button>
        )}

        {/* Profile Avatar / Link (Only shown if logged in) */}
        {token && (
          <button className="hover:scale-105 transition-transform">
            <Link
              className="w-10 h-10 rounded-full flex items-center justify-center text-textPrimary text-lg font-bold border-2 border-textPrimary bg-canvas shadow-sm"
              to="/profile"
            >
              R
            </Link>
          </button>
        )}

        {/* Logout Button (Appears when authenticated) */}
        {token && (
          <button 
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
}