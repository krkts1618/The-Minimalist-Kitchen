import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= TIMER ENGINE STATE =================
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 1. Fetch data from backend
  useEffect(() => {
    const fetchSingleRecipe = async () => {
      try {
        const res = await fetch(
          `https://the-minimalist-kitchen.onrender.com/api/recipes/${id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch dish details");

        const data = await res.json();
        setRecipe(data);

        // Smart parse: Extract raw minutes from strings like "45 mins"
        const parsedMins = parseInt(data.prepTime) || 30;
        const totalSecs = parsedMins * 60;
        setTimerSeconds(totalSecs);
        setInitialSeconds(totalSecs);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSingleRecipe();
  }, [id]);

  // 2. Interval countdown countdown effect
  useEffect(() => {
    let interval = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  // Format seconds to MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Calculate progress bar percentage
  const progressPercent =
    initialSeconds > 0
      ? ((initialSeconds - timerSeconds) / initialSeconds) * 100
      : 0;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center py-24 text-textSecondary font-bold animate-pulse">
        Opening the recipe ledger... 📖
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center py-24">
        <p className="text-4xl mb-2">🫗</p>
        <h2 className="text-2xl font-bold text-textPrimary">Dish Not Found</h2>
        <p className="text-textSecondary text-sm mt-1">{error}</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-accentCyan text-[#0A0F14] font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          ← Back to Kitchen
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      {/* Top Navigation */}
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-accentCyan hover:underline flex items-center gap-1 mb-6"
      >
        <span>←</span> Back to all Curations
      </Link>

      {/* Hero Header */}
      <div className="bg-surface border border-borderCool rounded-3xl overflow-hidden shadow-lg mb-10">
        <div className="h-64 sm:h-80 md:h-96 w-full overflow-hidden relative">
          <img
            src={
              recipe.imageUrl ||
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80"
            }
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          {/* ◄── FIXED: ₹199 price badge completely removed */}
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-accentCyan/10 border border-accentCyan/30 text-accentCyan text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {recipe.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-textPrimary tracking-tight">
            {recipe.title}
          </h1>

          <p className="mt-4 text-textSecondary text-sm sm:text-base leading-relaxed">
            {recipe.description ||
              "A classic, rich, and deeply spiced traditional culinary preparation."}
          </p>

          {/* ◄── FIXED: Logged date removed, Portion kept clean */}
          <div className="mt-6 pt-6 border-t border-borderCool flex flex-wrap items-center gap-8 text-sm font-semibold text-textPrimary">
            <div>
              <span className="text-textSecondary block text-xs uppercase tracking-wider">
                Estimated Time
              </span>
              <span className="text-base font-bold text-accentCyan">
                ⏱️ {recipe.prepTime}
              </span>
            </div>
            <div>
              <span className="text-textSecondary block text-xs uppercase tracking-wider">
                Portion
              </span>
              <span className="text-base">🍽️ {recipe.servings} Servings</span>
            </div>
          </div>

          {/* ================= NATIVE INTERACTIVE TIMER ================= */}
          <div className="mt-8 bg-canvas/60 border border-borderCool rounded-2xl p-5 shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-textSecondary block">
                  Kitchen Assistant
                </span>
                <span className="text-2xl font-mono font-extrabold tracking-tight text-textPrimary">
                  {timerSeconds === 0
                    ? "🎉 DISH READY!"
                    : formatTime(timerSeconds)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  disabled={timerSeconds === 0}
                  className={`px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    isRunning
                      ? "bg-amber-500 hover:bg-amber-600 text-black shadow-md"
                      : timerSeconds === 0
                        ? "bg-borderCool text-textSecondary cursor-not-allowed"
                        : "bg-accentCyan hover:bg-cyan-400 text-[#0A0F14] shadow-md shadow-accentCyan/10 scale-[1.02]"
                  }`}
                >
                  {isRunning ? "⏸️ Pause Timer" : "▶️ Start Timer"}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setTimerSeconds(initialSeconds);
                  }}
                  className="px-4 py-2 bg-surface hover:bg-borderCool/60 border border-borderCool rounded-xl font-bold text-xs text-textSecondary hover:text-textPrimary uppercase tracking-wider transition-colors cursor-pointer"
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Timer Progress Bar */}
            <div className="w-full bg-surface h-2 rounded-full overflow-hidden border border-borderCool/40">
              <div
                className="bg-accentCyan h-full transition-all duration-1000 ease-linear"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Ingredients vs Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Ingredients */}
        <div className="md:col-span-5 bg-surface border border-borderCool rounded-2xl p-6 h-fit">
          <h3 className="text-lg font-bold text-textPrimary mb-4 pb-2 border-b border-borderCool flex items-center justify-between">
            <span>Ingredients</span>
            <span className="text-xs bg-canvas px-2.5 py-1 rounded-md text-accentCyan font-mono font-bold">
              {recipe.ingredients?.length || 0} items
            </span>
          </h3>

          <ul className="space-y-3">
            {recipe.ingredients?.map((ing, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-textSecondary hover:text-textPrimary transition-colors"
              >
                <input
                  type="checkbox"
                  className="mt-1 rounded bg-canvas border-borderCool text-accentCyan focus:ring-0 cursor-pointer shadow-sm"
                />
                <span className="leading-snug">{ing}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Instructions */}
        <div className="md:col-span-7 bg-surface border border-borderCool rounded-2xl p-6">
          <h3 className="text-lg font-bold text-textPrimary mb-4 pb-2 border-b border-borderCool">
            Preparation Steps
          </h3>

          <ol className="space-y-6">
            {recipe.instructions?.map((step, i) => (
              <li key={i} className="flex gap-4 group">
                <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-canvas border border-borderCool flex items-center justify-center text-xs font-bold text-accentCyan group-hover:bg-accentCyan group-hover:text-[#0A0F14] transition-colors shadow-sm">
                  {i + 1}
                </span>
                <p className="text-sm text-textSecondary group-hover:text-textPrimary leading-relaxed pt-0.5 transition-colors">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
