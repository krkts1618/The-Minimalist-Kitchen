import { Link } from "react-router-dom";
import sun from "../assets/sun-shape-svgrepo-com.svg";
import moon from "../assets/crescent-moon-phase-svgrepo-com.svg";
export default function Navbar({ toggleBtn, darkmode }) {
  return (
    <>
      <div className="left">
        <h1 className="tracking-wider  text-xl font-bold  dark:text-textPrimary text-textPrimary">
          <Link to="/">THE MINIMALIST KITCHEN</Link>
        </h1>
      </div>
      <div className=" right flex items-center gap-6 ">
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
        <button className="bg-accentCyan transition-colors duration-300 text-darkCanvas w-10 h-10 rounded-full shadow-md hover:scale-105  flex items-center justify-center font-bold  ">
          <Link to="/create">+</Link>
        </button>
        <button className="hover:scale-105 transition-transform">
          <Link
            className="w-10 h-10 rounded-full  flex items-center justify-center text-textPrimary text-lg font-bold border-2 border-textPrimary bg-canvas shadow-sm "
            to="/profile"
          >
            R
          </Link>
        </button>
      </div>
    </>
  );
}
