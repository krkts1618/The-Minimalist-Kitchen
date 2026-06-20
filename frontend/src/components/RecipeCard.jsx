import { Link } from "react-router-dom";

const IMAGE_FALLBACKS = [
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512058564366-18510be2b19e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512058564366-18510be2b19e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1604908176997-431f3b7e39f2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505253716362-afaea6fc7f77?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80",
];

// Added default 'index = 0' so it NEVER equals NaN again!
export default function RecipeCard({ recipe, index = 0 }) {
  // Directly targets the actual DB key: recipe.imageUrl
  const imgSrc =
    recipe.imageUrl || IMAGE_FALLBACKS[index % IMAGE_FALLBACKS.length];

  return (
    <article className="rounded-2xl overflow-hidden shadow-lg border border-borderCool flex flex-col h-full bg-surface">
      <div className="relative">
        <img
          src={imgSrc}
          alt={recipe.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = IMAGE_FALLBACKS[index % IMAGE_FALLBACKS.length];
          }}
        />
        <span className="absolute bottom-3 left-3 bg-accentCyan text-[#0A0F14] text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {recipe.category}
        </span>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-textPrimary tracking-tight line-clamp-2">
            {recipe.title}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-borderCool/60 flex items-center justify-between text-sm text-textSecondary font-medium">
          <div className="flex items-center gap-1.5">
            <span>⏱️</span>
            {/* Removed the hardcoded 'mins' word because the DB supplies it */}
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🍽️</span>
            <span>{recipe.servings} Servings</span>
          </div>
        </div>

        <Link
          to={`/recipe/${recipe._id}`}
          className="mt-4 block w-full text-center bg-canvas hover:bg-accentCyan hover:text-[#0A0F14] text-textPrimary font-bold py-2.5 rounded-xl transition-colors border border-borderCool duration-200"
        >
          View Recipe
        </Link>
      </div>
    </article>
  );
}
