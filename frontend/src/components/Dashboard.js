import { useEffect, useState } from "react";
import API from "../api";
import AIChat from "../components/AIChat";
import {
  BarChart3,
  PieChart as PieChartIcon,
  FileDown,
  Rocket,
  AlertTriangle,
  Package,
  Tags,
  Download,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStock: 0,
    totalCategories: 0,
  });
  const [categoryData, setCategoryData] = useState([]);

  // Professional Color Palette
  const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];

  const fetchStats = async () => {
    try {
      const res = await API.get("/products");
      const products = res.data || [];
      const totalProducts = products.length;
      const lowStock = products.filter((p) => p.quantity < 5).length;
      const categories = {};

      products.forEach((p) => {
        categories[p.category] = (categories[p.category] || 0) + 1;
      });

      const categoryChart = Object.keys(categories).map((key) => ({
        name: key,
        value: categories[key],
      }));

      setStats({
        totalProducts,
        lowStock,
        totalCategories: Object.keys(categories).length,
      });
      setCategoryData(categoryChart);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const upgradePlan = async () => {
    try {
      const res = await API.post("/payment/create-checkout-session");
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-10 animate-in fade-in duration-500">
      {/* --- TOP HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            Analytics Command <span className="text-indigo-600">Center</span>
          </h1>
          <p className="text-slate-500 mt-1 font-medium italic">
            Real-time intelligence for your inventory ecosystem.
          </p>
        </div>

        <button
          onClick={upgradePlan}
          className="group relative flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-slate-200"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Rocket size={20} className="relative z-10" />
          <span className="relative z-10 font-bold">Go Premium</span>
          <ArrowUpRight
            size={18}
            className="relative z-10 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
          />
        </button>
      </header>

      {/* --- QUICK ACTIONS BAR --- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <div className="lg:col-span-3 bg-white border border-slate-200 p-6 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <FileDown size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800">
                Export Business Reports
              </h3>
              <p className="text-slate-400 text-sm">
                Download your stock data in high-fidelity formats.
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() =>
                window.open("http://localhost:5000/api/reports/csv")
              }
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold px-6 py-3 rounded-xl border border-slate-200 transition-colors"
            >
              <Download size={18} /> CSV
            </button>
            <button
              onClick={() =>
                window.open("http://localhost:5000/api/reports/pdf")
              }
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-6 py-3 rounded-xl border border-rose-100 transition-colors"
            >
              <FileDown size={18} /> PDF
            </button>
          </div>
        </div>

        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white flex flex-col justify-center shadow-lg shadow-indigo-200 relative overflow-hidden group">
          <Sparkles className="absolute -right-4 -top-4 w-24 h-24 opacity-20 group-hover:scale-125 transition-transform duration-700" />
          <p className="text-indigo-100 text-sm font-semibold mb-1 uppercase tracking-wider">
            System Health
          </p>
          <p className="text-2xl font-bold">Stable & Syncing</p>
        </div>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <StatCard
          icon={<Package size={28} />}
          title="Total Inventory"
          value={stats.totalProducts}
          trend="+12% this month"
          color="indigo"
        />
        <StatCard
          icon={<AlertTriangle size={28} />}
          title="Critical Stock"
          value={stats.lowStock}
          trend="Action required"
          color="rose"
        />
        <StatCard
          icon={<Tags size={28} />}
          title="Active Segments"
          value={stats.totalCategories}
          trend="Optimized"
          color="purple"
        />
      </div>

      {/* --- CHARTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <BarChart3 size={20} className="text-indigo-600" />
              Volume Analytics
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={categoryData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "#f8fafc" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[8, 8, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <PieChartIcon size={20} className="text-purple-600" />
              Category Mix
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* --- AI ASSISTANT PANEL --- */}
      <div className="mt-12 bg-white rounded-[2.5rem] border-2 border-indigo-100 shadow-xl overflow-hidden">
        <div className="bg-indigo-600 px-8 py-4 flex items-center gap-3">
          <Sparkles className="text-white" size={20} />
          <h3 className="text-white font-bold tracking-wide uppercase text-sm">
            Neural Inventory Engine
          </h3>
        </div>
        <div className="p-6">
          <AIChat />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend, color }) {
  const themes = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
      <div
        className={`w-14 h-14 ${themes[color]} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-slate-500 font-bold text-sm uppercase tracking-widest">
        {title}
      </h3>
      <div className="flex items-baseline gap-3 mt-2">
        <h2 className="text-5xl font-black text-slate-900 leading-none">
          {value}
        </h2>
        <span
          className={`text-xs font-bold px-2 py-1 rounded-lg ${themes[color]}`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

export default Dashboard;
