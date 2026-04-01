import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, setToken } from "../api";
import { inputClass } from "../components/FormField";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.auth.register(form.email, form.password, form.name || undefined);
      const { token } = await api.auth.login(form.email, form.password);
      setToken(token);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-indigo-400 font-bold text-2xl tracking-tight">Voxmation OS</span>
          <p className="text-gray-500 text-sm mt-2">Create a new account</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
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
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
