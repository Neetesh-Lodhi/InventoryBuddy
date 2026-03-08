import { useState } from "react";
import { motion } from "framer-motion"; // npm install framer-motion
import {
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react"; // npm install lucide-react
import API from "../api";

function Login({ setIsAuthenticated, setIsLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      // In a world-class UI, we use toast notifications, but alert works for logic
      alert("❌ Access Denied: Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/40 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-[440px] px-6"
      >
        {/* Logo / Brand Area */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-200 mb-4">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-slate-500 font-medium mt-2">
            Enter your credentials to access the hub
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                Username
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  name="username"
                  type="text"
                  placeholder="admin_user"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <LogIn size={20} />
                    <span>Sign In</span>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 font-medium">
              New to the platform?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors inline-flex items-center gap-1 group"
              >
                Create Account
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <p className="mt-8 text-center text-slate-400 text-xs font-medium flex items-center justify-center gap-2">
          <ShieldCheck size={14} /> 256-bit SSL Secure Encryption
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
