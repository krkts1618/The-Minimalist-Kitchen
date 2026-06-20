import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import RecipeDetails from "./pages/RecipeDetail";
import CreateRecipe from "./pages/CreateRecipe";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
export default function App() {
  const [darkmode, setmode] = useState(() => {
    const savedtheme = localStorage.getItem("app-theme");
    return savedtheme ? savedtheme === "dark" : true;
  });
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
  return (
    <div className=" bg-canvas min-h-screen transition-colors duration-300">
      <header className="flex justify-between items-center px-8 py-4   border-b border-borderCool shadow-md ">
        <Navbar darkmode={darkmode} toggleBtn={toggleBtn} />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

    
  );
}
