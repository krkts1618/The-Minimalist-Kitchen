import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ALLOWED_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Quick Meals",
];

export default function CreateRecipe() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Standard String States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Lunch");
  const [prepTime, setPrepTime] = useState("");
  const [servings, setServings] = useState(2);
  const [imageUrl, setImageUrl] = useState("");

  // 2. Dynamic Array States (Start with 1 empty box each)
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  // ================= ARRAY SPAWNERS & DELETORS =================
  const handleArrayChange = (setter, array, index, newValue) => {
    const updated = [...array];
    updated[index] = newValue;
    setter(updated);
  };

  const addField = (setter, array, placeholderText = "") => {
    setter([...array, placeholderText]);
  };

  const removeField = (setter, array, indexToRemove) => {
    if (array.length === 1) return; // Always keep at least 1 field
    setter(array.filter((_, idx) => idx !== indexToRemove));
  };

  // ================= FORM SUBMISSION =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Scrub out accidental empty input boxes
    const cleanedIngredients = ingredients.filter((item) => item.trim() !== "");
    const cleanedInstructions = instructions.filter(
      (item) => item.trim() !== "",
    );

    if (cleanedIngredients.length === 0 || cleanedInstructions.length === 0) {
      setError(
        "Please provide at least one valid ingredient and preparation step.",
      );
      setLoading(false);
      return;
    }

    // Build exact object matching your Mongoose Schema
    const payload = {
      title,
      category,
      prepTime: prepTime.includes("mins") ? prepTime : `${prepTime} mins`,
      servings: Number(servings),
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      imageUrl:
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    };

    try {
      const res = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Database rejected the submission");
      }

      // 🟢 VICTORY! Teleport the user to the home feed instantly
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      <Link
        to="/"
        className="text-xs font-bold uppercase tracking-wider text-accentCyan hover:underline flex items-center gap-1 mb-6"
      >
        <span>←</span> Cancel & Return
      </Link>

      <div className="bg-surface border border-borderCool rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="border-b border-borderCool pb-6 mb-8">
          <h1 className="text-3xl font-extrabold text-textPrimary tracking-tight">
            Log New Curation
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Publish a new culinary specification directly into the global
            MongoDB instance.
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-sm font-semibold">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================= ROW 1: TITLE & CATEGORY ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="sm:col-span-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
                Dish Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Hyderabadi Dum Biryani"
                className="w-full bg-canvas text-textPrimary px-4 py-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
                Classification *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-canvas text-textPrimary px-4 py-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium cursor-pointer"
              >
                {ALLOWED_CATEGORIES.map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    className="bg-surface text-textPrimary"
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ================= ROW 2: METRICS & IMAGE ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
                Prep Duration *
              </label>
              <input
                type="text"
                required
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                placeholder="e.g. 35 mins"
                className="w-full bg-canvas text-textPrimary px-4 py-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
                Portions *
              </label>
              <input
                type="number"
                min="1"
                max="20"
                required
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full bg-canvas text-textPrimary px-4 py-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary mb-2">
                Unsplash URL (Optional)
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full bg-canvas text-textPrimary px-4 py-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none transition-colors text-sm font-medium"
              />
            </div>
          </div>

          {/* ================= ROW 3: DYNAMIC INGREDIENTS ================= */}
          <div className="pt-4 border-t border-borderCool">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary">
                Ingredients Ledger *
              </label>
              <button
                type="button"
                onClick={() => addField(setIngredients, ingredients)}
                className="text-xs font-bold text-accentCyan hover:text-cyan-300 transition-colors bg-canvas px-3 py-1.5 rounded-lg border border-borderCool cursor-pointer"
              >
                + Add Ingredient
              </button>
            </div>

            <div className="space-y-2.5">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    required={index === 0} // Only first box is strictly mandatory
                    value={ing}
                    onChange={(e) =>
                      handleArrayChange(
                        setIngredients,
                        ingredients,
                        index,
                        e.target.value,
                      )
                    }
                    placeholder={`Ingredient #${index + 1} (e.g. 2 cups Basmati Rice)`}
                    className="flex-1 bg-canvas text-textPrimary px-4 py-2.5 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none text-sm font-medium"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeField(setIngredients, ingredients, index)
                      }
                      className="px-3 bg-surface hover:bg-red-500/20 text-textSecondary hover:text-red-400 border border-borderCool rounded-xl font-bold text-sm transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= ROW 4: DYNAMIC INSTRUCTIONS ================= */}
          <div className="pt-4 border-t border-borderCool">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-textSecondary">
                Preparation Sequence *
              </label>
              <button
                type="button"
                onClick={() => addField(setInstructions, instructions)}
                className="text-xs font-bold text-accentCyan hover:text-cyan-300 transition-colors bg-canvas px-3 py-1.5 rounded-lg border border-borderCool cursor-pointer"
              >
                + Add Step
              </button>
            </div>

            <div className="space-y-2.5">
              {instructions.map((step, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="mt-2 text-xs font-mono font-bold text-textSecondary w-6 text-right">
                    {index + 1}.
                  </span>
                  <textarea
                    rows="2"
                    required={index === 0}
                    value={step}
                    onChange={(e) =>
                      handleArrayChange(
                        setInstructions,
                        instructions,
                        index,
                        e.target.value,
                      )
                    }
                    placeholder={`Step #${index + 1} instructions...`}
                    className="flex-1 bg-canvas text-textPrimary p-3 rounded-xl border border-borderCool focus:border-accentCyan focus:outline-none text-sm font-medium resize-none"
                  />
                  {instructions.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeField(setInstructions, instructions, index)
                      }
                      className="h-11 px-3 mt-0.5 bg-surface hover:bg-red-500/20 text-textSecondary hover:text-red-400 border border-borderCool rounded-xl font-bold text-sm transition-colors cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-accentCyan hover:bg-cyan-400 text-[#0A0F14] font-extrabold py-4 rounded-2xl shadow-lg shadow-accentCyan/10 uppercase tracking-wider text-sm transition-all transform active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? "Transmitting to MongoDB Vault... 🚀"
              : "Publish Curation to Kitchen ✨"}
          </button>
        </form>
      </div>
    </div>
  );
}
