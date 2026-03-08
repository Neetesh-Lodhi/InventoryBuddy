import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Loader2,
  ShieldCheck,
  CheckCircle2,
  Info,
} from "lucide-react";
import API from "../api";

function Signup({ setIsLogin }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Password strength logic
  const passwordStrength = {
    length: form.password.length >= 8,
    number: /[0-9]/.test(form.password),
    special: /[!@#$%^&*]/.test(form.password),
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      // In a real world-class UI, we'd use a Toast here
      alert("Account activated! Redirecting to login...");
      setForm({ username: "", email: "", password: "" });
      setIsLogin(true);
    } catch (error) {
      alert(error.response?.data?.message || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] relative overflow-hidden">
      {/* --- BRANDED BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 pointer-events-none"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[480px] px-6"
      >
        <div className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white shadow-2xl shadow-indigo-200/50">
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-100 mb-6">
              <UserPlus size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Join InventoryBuddy
            </h2>
            <p className="text-slate-500 font-medium mt-2">
              Start managing your inventory like a pro today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Identity
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  name="username"
                  placeholder="Choose a username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Work Email
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                Security Key
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocus(true)}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Password Strength Meter - Appears on focus */}
              {passwordFocus && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mt-2 space-y-2"
                >
                  <p className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                    <Info size={12} /> Password Requirements:
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    <Requirement
                      met={passwordStrength.length}
                      text="At least 8 characters"
                    />
                    <Requirement
                      met={passwordStrength.number}
                      text="Includes a number"
                    />
                    <Requirement
                      met={passwordStrength.special}
                      text="Includes a special character"
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="group w-full relative overflow-hidden bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-70 mt-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span>Create Free Account</span>
                    <ArrowLeft size={18} className="rotate-180" />
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-10 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium text-sm">
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
              >
                Sign In Instead
              </button>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <ShieldCheck size={14} className="text-emerald-500" />
          GDPR Compliant & Secure Data Architecture
        </p>
      </motion.div>
    </div>
  );
}

// Helper component for Password Requirements
const Requirement = ({ met, text }) => (
  <div
    className={`flex items-center gap-2 text-xs font-semibold ${met ? "text-emerald-600" : "text-slate-400"}`}
  >
    <CheckCircle2 size={14} className={met ? "opacity-100" : "opacity-30"} />
    <span className={met ? "" : "line-through opacity-50"}>{text}</span>
  </div>
);

export default Signup;
