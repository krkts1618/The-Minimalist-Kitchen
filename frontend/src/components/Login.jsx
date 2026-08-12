import { useState } from "react";
import API from "../services/api";

export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      if (isLogin) {
        const { data } = await API.post("/auth/login", { email, password });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (onLoginSuccess) onLoginSuccess(data.user);
      } else {
        await API.post("/auth/register", { username, email, password });
        setSuccessMsg("Account created successfully! Please log in.");
        setIsLogin(true);
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, macha.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] px-4">
      <div className="w-full max-w-md bg-canvas border border-borderCool p-8 rounded-2xl shadow-xl transition-colors duration-300">
        <h2 className="text-2xl font-bold text-center mb-1 text-kitchen-darkText text-cyan-600 ">
          {isLogin ? "Welcome Back, Chef " : "Join The Kitchen "}
        </h2>
        <p className="text-sm text-center text-kitchen-mutedText dark:text-gray-400 mb-6">
          {isLogin
            ? "Enter your credentials to access your recipes"
            : "Create an account to start curating dishes"}
        </p>

        {error && (
          <div className="bg-red-100 dark:bg-red-950/55 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg text-sm mb-4">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-kitchen-darkText dark:text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-borderCool rounded-lg text-kitchen-darkText dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter username"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-kitchen-darkText dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-borderCool rounded-lg text-kitchen-darkText dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="chef@kitchen.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-kitchen-darkText dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-borderCool rounded-lg text-kitchen-darkText dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition duration-200 shadow-md"
          >
            {isLogin ? "Login to Kitchen" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-kitchen-mutedText dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccessMsg("");
            }}
            className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline focus:outline-none ml-1 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
