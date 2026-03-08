import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // npm install framer-motion
import {
  BarChart3,
  Cpu,
  ShieldCheck,
  ArrowRight,
  Layers,
  Zap,
  LayoutDashboard,
  Box,
} from "lucide-react"; // npm install lucide-react

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-indigo-100 overflow-x-hidden relative">
      {/* --- ADVANCED BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Dynamic Blobs */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-200/40 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-200/40 blur-[120px] rounded-full"></div>
      </div>

      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Layers className="text-white" size={22} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">
              InventoryBuddy<span className="text-indigo-600">.</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link
              to="/dashboard"
              className="hover:text-indigo-600 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/products"
              className="hover:text-indigo-600 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/dashboard"
              className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition-all active:scale-95 shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto pt-24 pb-16 px-6 text-center"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold mb-6"
        >
          <Zap size={14} fill="currentColor" />
          <span>v2.0 is now live with AI insights</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8 leading-[1.1]"
        >
          Master Your Stock with <br />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Intelligence.
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          BudgetBuddy isn't just a list. It's a high-performance MERN engine
          featuring real-time analytics, automated stock alerts, and AI-driven
          forecasting.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link to="/dashboard">
            <button className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:shadow-indigo-400/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 font-bold group">
              <LayoutDashboard size={20} />
              Launch Dashboard
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
          <Link to="/products">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 transition-all font-bold flex items-center justify-center gap-2">
              <Box size={20} />
              Browse Catalog
            </button>
          </Link>
        </motion.div>
      </motion.section>

      {/* --- FEATURES GRID --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BarChart3 size={28} />}
            title="Real-time Analytics"
            desc="Deep-dive into your stock turnover, profit margins, and performance metrics with interactive charts."
            color="indigo"
          />
          <FeatureCard
            icon={<Cpu size={28} />}
            title="AI Forecaster"
            desc="Leverage machine learning to predict low-stock scenarios before they happen. Stay ahead of the curve."
            color="purple"
          />
          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Enterprise Security"
            desc="Stripe-integrated payments and multi-layer authentication keeping your business data locked tight."
            color="emerald"
          />
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
            Ready to transform your business?
          </h2>
          <p className="text-slate-400 mb-10 text-lg relative z-10">
            Join 2,000+ businesses automating their inventory today.
          </p>
          <Link
            to="/dashboard"
            className="relative z-10 inline-block px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            Get Started for Free
          </Link>
        </div>
      </section>

      <footer className="text-center py-12 text-slate-400 font-medium border-t border-slate-100">
        <p>© 2026 InventoryBuddy AI • The Future of Inventory Management</p>
      </footer>
    </div>
  );
}

// Sub-component for Feature Cards
function FeatureCard({ icon, title, desc, color }) {
  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="group p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-100 hover:-translate-y-2 transition-all duration-300">
      <div
        className={`w-16 h-16 rounded-2xl ${colorMap[color]} flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform`}
      >
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}

export default Home;
