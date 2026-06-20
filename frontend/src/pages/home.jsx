import { useState, useEffect, useDeferredValue } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import RecipeCard from "../components/RecipeCard";

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Quick Meals",
];

export default function Home() {
  // 1. Network State
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. User Input State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectCategory, setSelectCategory] = useState("All");

  // 3. React 18 Keyboard Shock-Absorber
  const deferredSearch = useDeferredValue(searchQuery);

  // 4. FormKit 60fps DOM Animator Hook
  const [gridRef] = useAutoAnimate();

  useEffect(() => {
    const fetchCloudRecipes = async () => {
      try {
        const res = await fetch(
          "https://the-minimalist-kitchen.onrender.com/api/recipes",
        );
        if (!res.ok) throw new Error("Backend vault refused connection");

        const liveData = await res.json();
        setRecipes(liveData);
        setLoading(false);
      } catch (err) {
        console.error("🔴 Network drop: ", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCloudRecipes();
  }, []);

  // 🧠 DERIVED ENGINE: Runs instantly off the buffered keyboard
  const filteredRecipes = recipes.filter((recipe) => {
    const matchSearch = recipe.title
      .toLowerCase()
      .includes(deferredSearch.toLowerCase());

    const matchCategory =
      selectCategory === "All" || recipe.category === selectCategory;

    return matchSearch && matchCategory;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================= SIDEBAR ================= */}
        <aside className="lg:col-span-1 bg-surface border border-borderCool rounded-2xl p-6 h-fit lg:sticky lg:top-24 shadow-sm transition-colors duration-300">
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
              Search Dish
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type recipe title..."
              className="w-full bg-canvas text-textPrimary px-4 py-2.5 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-3">
              Categories
            </label>
            <div className="flex flex-wrap lg:flex-col gap-2">
              <button
                onClick={() => setSelectCategory("All")}
                className={`px-4 py-2.5 text-xs rounded-xl uppercase tracking-wider text-left lg:w-full transition-all cursor-pointer font-bold ${
                  selectCategory === "All"
                    ? "bg-accentCyan text-[#0A0F14] scale-[1.02] shadow-sm"
                    : "bg-canvas text-textSecondary hover:text-textPrimary"
                }`}
              >
                ✨ All Cuisines
              </button>

              {CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectCategory(cat)}
                  className={`px-4 py-2.5 text-xs rounded-xl uppercase tracking-wider text-left lg:w-full transition-all cursor-pointer font-semibold ${
                    selectCategory === cat
                      ? "bg-accentCyan text-[#0A0F14] scale-[1.02] shadow-sm font-bold"
                      : "bg-canvas text-textSecondary hover:text-textPrimary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= GALLERY ================= */}
        <section className="lg:col-span-3">
          <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-textPrimary">
              Explore Curation
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider bg-canvas border border-borderCool px-3 py-1.5 rounded-lg text-textSecondary w-fit sm:w-auto">
              Showing {filteredRecipes.length} of {recipes.length} recipes
            </span>
          </div>

          {loading ? (
            /* 🪄 THE RIGID SKELETON: Prevents DOM squishing while Mongo responds */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="rounded-2xl border border-borderCool bg-surface/40 p-5 h-[360px] flex flex-col justify-between animate-pulse"
                >
                  <div className="w-full h-48 bg-borderCool/40 rounded-xl"></div>
                  <div className="space-y-3 mt-4">
                    <div className="h-5 bg-borderCool/50 rounded-md w-3/4"></div>
                    <div className="h-4 bg-borderCool/30 rounded-md w-1/2"></div>
                  </div>
                  <div className="h-10 bg-borderCool/40 rounded-xl w-full mt-4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="col-span-full text-center py-16 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 font-bold">
              Failed to load kitchen: {error}
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-16 bg-surface/40 border border-borderCool rounded-2xl text-textSecondary">
              <p className="text-4xl mb-3">🍽️</p>
              <p className="text-lg font-bold text-textPrimary">
                No matching dishes
              </p>
              <p className="text-xs mt-1">
                Try searching for a different keyword
              </p>
            </div>
          ) : (
            /* ◄── LOCKED: gridRef active only in the post-load safe zone */
            <div
              ref={gridRef}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredRecipes.map((recipe, index) => (
                <RecipeCard key={recipe._id} recipe={recipe} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
