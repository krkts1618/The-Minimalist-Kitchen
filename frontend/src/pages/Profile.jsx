import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch the master ledger
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/recipes");
        if (!res.ok) throw new Error("Failed to connect to backend vault");
        const data = await res.json();
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchLedger();
  }, []);

  // ================= ASSASSINATION FUNCTION =================
  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `⚠️ DANGER: Are you sure you want to permanently delete "${title}" from the MongoDB Cloud Vault?`,
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Server refused deletion request");

      // Instantly filter it out of the local React RAM
      setRecipes((prev) => prev.filter((item) => item._id !== id));
      setDeletingId(null);
    } catch (err) {
      alert(`Deletion failed: ${err.message}`);
      setDeletingId(null);
    }
  };

  // ================= FLEET MATH (DERIVED) =================
  const totalDishes = recipes.length;

  const avgPrepTime =
    totalDishes > 0
      ? Math.round(
          recipes.reduce((acc, curr) => {
            const num = parseInt(curr.prepTime) || 30;
            return acc + num;
          }, 0) / totalDishes,
        )
      : 0;

  const quickMealsCount = recipes.filter(
    (r) => r.category === "Quick Meals",
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-10">
      {/* Top Breadcrumb */}
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-accentCyan hover:underline flex items-center gap-1"
      >
        <span>←</span> Return to Kitchen Grid
      </Link>

      {/* ================= SECTION 1: IDENTITY CARD ================= */}
      <div className="bg-surface border border-borderCool rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-accentCyan to-blue-600 flex items-center justify-center shadow-lg shadow-accentCyan/20 text-[#0A0F14] font-black text-4xl tracking-tighter sm:flex-shrink-0">
            RK
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="bg-accentCyan/10 border border-accentCyan/30 text-accentCyan text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                System Architect
              </span>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                full stack developer
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-textPrimary tracking-tight">
              Ravi Kumar Kocherla
            </h1>
            <p className="text-xs sm:text-sm text-textSecondary mt-1">
              Full-Stack Engineering Lead & Curator of The Minimalist Kitchen.
            </p>
          </div>
        </div>

        <Link
          to="/create"
          className="bg-accentCyan hover:bg-cyan-400 text-[#0A0F14] font-extrabold px-6 py-3 rounded-2xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-accentCyan/10 sm:flex-shrink-0"
        >
          + Curate New Dish
        </Link>
      </div>

      {/* ================= SECTION 2: LIVE TELEMETRY ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-surface/60 border border-borderCool rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">
            Active Fleet Volume
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-textPrimary">
              {loading ? "-" : totalDishes}
            </span>
            <span className="text-xs text-textSecondary font-bold">
              Total Curations
            </span>
          </div>
        </div>

        <div className="bg-surface/60 border border-borderCool rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">
            Menu Agility Index
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-accentCyan">
              {loading ? "-" : `~${avgPrepTime}`}
            </span>
            <span className="text-xs text-textSecondary font-bold">
              Mins Avg Prep
            </span>
          </div>
        </div>

        <div className="bg-surface/60 border border-borderCool rounded-2xl p-6 flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-textSecondary">
            Velocity Factor
          </span>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-4xl font-black text-purple-400">
              {loading ? "-" : quickMealsCount}
            </span>
            <span className="text-xs text-textSecondary font-bold">
              "Quick Meals"
            </span>
          </div>
        </div>
      </div>

      {/* ================= SECTION 3: THE DANGER ZONE LEDGER ================= */}
      <div className="bg-surface border border-borderCool rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 sm:p-8 border-b border-borderCool flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-textPrimary tracking-tight">
              Vault Management Ledger
            </h2>
            <p className="text-xs text-textSecondary mt-0.5">
              Live read-write view of your MongoDB cluster. Deletions executed
              here are irreversible.
            </p>
          </div>
          <span className="text-xs font-mono bg-canvas px-3 py-1.5 rounded-xl border border-borderCool text-textSecondary self-start sm:self-auto">
            {recipes.length} records indexed
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center text-sm font-bold text-textSecondary animate-pulse">
            Scanning secure database records... 🔍
          </div>
        ) : error ? (
          <div className="p-16 text-center text-sm font-bold text-red-400">
            Failed to load vault records: {error}
          </div>
        ) : recipes.length === 0 ? (
          <div className="p-16 text-center text-sm text-textSecondary">
            The vault is completely empty. Use the 'Curate New Dish' button
            above to begin.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-borderCool/60 text-[10px] font-extrabold uppercase tracking-widest text-textSecondary bg-canvas/40">
                  <th className="py-4 px-6">Dish Title</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Est. Time</th>
                  <th className="py-4 px-6">Portion</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderCool text-sm font-medium">
                {recipes.map((dish) => (
                  <tr
                    key={dish._id}
                    className="hover:bg-canvas/30 transition-colors group"
                  >
                    <td className="py-4 px-6 font-bold text-textPrimary max-w-xs truncate">
                      <Link
                        to={`/recipe/${dish._id}`}
                        className="hover:text-accentCyan transition-colors"
                      >
                        {dish.title}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-textSecondary">
                      <span className="bg-canvas border border-borderCool px-2.5 py-1 rounded-lg text-xs font-semibold">
                        {dish.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-textSecondary">
                      ⏱️ {dish.prepTime}
                    </td>
                    <td className="py-4 px-6 text-textSecondary">
                      🍽️ {dish.servings}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(dish._id, dish.title)}
                        disabled={deletingId === dish._id}
                        className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-black border border-red-500/20 hover:border-red-500 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                      >
                        {deletingId === dish._id ? "Purging..." : "✕ Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
