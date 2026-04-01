import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setToken } from "../api";
import { inputClass } from "../components/FormField";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.auth.login(email, password);
      setToken(token);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-indigo-400 font-bold text-2xl tracking-tight">Voxmation OS</span>
          <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                required
                className={inputClass}
              />
            </div>
            {error && (
              <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-900/50 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-md transition-colors"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          No account?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
