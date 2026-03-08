import { useEffect, useState, useCallback } from "react";
import { Routes, Route, Link, Navigate, useLocation } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  Package,
  PlusCircle,
  LogOut,
  Bell,
  Settings,
  User,
  ChevronRight,
  Menu,
} from "lucide-react";
import API from "./api";

// Component Imports
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/Home";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const [isLogin, setIsLogin] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    totalInventoryValue: 0,
    lowStockCount: 0,
  });

  const location = useLocation();

  const fetchStats = useCallback(async () => {
    try {
      const res = await API.get("/products/dashboard");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchStats();
  }, [isAuthenticated, fetchStats]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  // Auth Handling
  if (!isAuthenticated) {
    return isLogin ? (
      <Login setIsAuthenticated={setIsAuthenticated} setIsLogin={setIsLogin} />
    ) : (
      <Signup setIsLogin={setIsLogin} />
    );
  }

  // Sidebar Nav Items (Centralized for cleaner code)
  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { name: "Products", path: "/products", icon: <Package size={20} /> },
    {
      name: "Add Product",
      path: "/add-product",
      icon: <PlusCircle size={20} />,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* SIDEBAR - High End Glass Gradient */}
      <aside
        className={`
        fixed lg:relative z-30 h-full bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-800
        ${sidebarOpen ? "w-72" : "w-20"}
      `}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3 p-6 h-20 border-b border-slate-800/50">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-900/40">
            <Package className="text-white" size={24} />
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
              Inventory Buddy
            </span>
          )}
        </div>

        {/* Sidebar Nav */}
        <nav className="p-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-semibold"
                      : "hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-400 transition-colors"}`}
                  >
                    {item.icon}
                  </span>
                  {sidebarOpen && <span>{item.name}</span>}
                </div>
                {sidebarOpen && isActive && (
                  <ChevronRight size={14} className="opacity-50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-3.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all duration-200"
          >
            <LogOut size={20} />
            {sidebarOpen && (
              <span className="font-semibold tracking-wide">Log Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* TOP NAVBAR - Glassmorphism */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <Menu size={20} />
            </button>
            <h1 className="hidden md:block text-slate-400 font-medium">
              Overview <span className="mx-2 text-slate-200">/</span>
              <span className="text-slate-800 font-bold capitalize">
                {location.pathname.replace("/", "") || "Home"}
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Badge */}
            <button className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200"></div>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-800 leading-none">
                  Admin User
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider italic">
                  Premium Account
                </p>
              </div>
              <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 p-[2px] rounded-2xl shadow-md transform transition-transform group-hover:scale-110">
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-blue-600 font-bold">
                  <User size={22} />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT - Smooth Scrolling and Animations */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-6 md:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<Dashboard stats={stats} />} />
              <Route
                path="/products"
                element={<ProductList refreshStats={fetchStats} />}
              />
              <Route
                path="/add-product"
                element={<AddProduct refreshProducts={fetchStats} />}
              />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
