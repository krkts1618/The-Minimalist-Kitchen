import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/home";
import RecipeDetails from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from "./components/Login"; // Your login component

export default function App() {
  // 1. Dark Mode State (Your original logic)
  const [darkmode, setmode] = useState(() => {
    const savedtheme = localStorage.getItem("app-theme");
    return savedtheme ? savedtheme === "dark" : true;
  });

  // 2. Auth Token State
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("app-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("app-theme", "light");
    }
  }, [darkmode]);

  function toggleBtn() {
    setmode((theme) => !theme);
  }

  const handleLoginSuccess = () => {
    setToken(localStorage.getItem("token"));
  };

  return (
    <div className="bg-canvas min-h-screen transition-colors duration-300 text-kitchen-darkText dark:text-gray-100">
      <header className="flex justify-between items-center px-8 py-4 border-b border-borderCool shadow-md">
        <Navbar
          darkmode={darkmode}
          toggleBtn={toggleBtn}
          token={token}
          setToken={setToken}
        />
      </header>

      <main className="px-4 py-6">
        
        {!token ? (
          // FORCE LOGIN: If there is no token, render ONLY the Login component
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          // RESTRICTED ROUTES: Only accessible with a valid token
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/create" element={<CreateRecipe />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        )}
      </main>
    </div>
  );
}
