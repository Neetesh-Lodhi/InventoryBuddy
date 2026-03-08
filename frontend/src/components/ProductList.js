import { useEffect, useState, useCallback } from "react";
import API from "../api";
import AddProduct from "./AddProduct";
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  Package,
  Layers,
  MoreHorizontal,
  AlertCircle,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

function ProductList({ refreshStats }) {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(
    async (searchQuery = "", categoryQuery = "") => {
      setIsLoading(true);
      try {
        const res = await API.get(
          `/products?search=${searchQuery}&category=${categoryQuery}`,
        );
        const data = res.data || [];
        setProducts(data);

        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts(search, category);
      if (refreshStats) refreshStats();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- ADD PRODUCT MODAL SECTION --- */}
      <div className="mb-8">
        <AddProduct
          refreshProducts={() => {
            fetchProducts(search, category);
            if (refreshStats) refreshStats();
          }}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      </div>

      {/* --- HEADER & CONTROLS --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <span className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200">
              <Layers size={24} />
            </span>
            Live Inventory
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Manage, filter, and track your global stock levels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group flex-1 min-w-[280px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, SKU, or supplier..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                fetchProducts(e.target.value, category);
              }}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all shadow-sm font-medium"
            />
          </div>

          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm hover:border-indigo-300 transition-colors cursor-pointer">
            <Filter size={18} className="text-slate-400 mr-2" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                fetchProducts(search, e.target.value);
              }}
              className="bg-transparent outline-none font-bold text-slate-700 cursor-pointer pr-4 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* --- TABLE SECTION --- */}
      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  Product Details
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  Category
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  Price / Unit
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                  Stock Status
                </th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                [...Array(5)].map((_, i) => <SkeletonLoader key={i} />)
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Package size={40} className="text-slate-300" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">
                        No products found
                      </h3>
                      <p className="text-slate-400">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="group hover:bg-slate-50/80 transition-all duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
                          {product.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                            {product.name}
                          </p>
                          <p className="text-sm text-slate-400 font-medium">
                            {product.supplier}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 uppercase tracking-tighter">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-lg font-black text-slate-800 tracking-tight">
                        ₹{product.price.toLocaleString()}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-700 font-mono">
                          {product.quantity}
                        </span>
                        {product.quantity < 5 ? (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 text-[10px] font-black uppercase animate-pulse border border-rose-100">
                            <AlertCircle size={12} /> Low
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase border border-emerald-100">
                            <TrendingUp size={12} /> Healthy
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => setEditProduct(product)}
                          className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <div className="p-2.5 text-slate-300 cursor-not-allowed">
                          <MoreHorizontal size={18} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- FOOTER INFO --- */}
        {!isLoading && (
          <div className="bg-slate-50/50 px-8 py-4 flex justify-between items-center border-t border-slate-100">
            <p className="text-sm text-slate-400 font-medium">
              Showing{" "}
              <span className="text-slate-800 font-bold">
                {products.length}
              </span>{" "}
              active products
            </p>
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors">
              View Audit Log <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const SkeletonLoader = () => (
  <tr className="animate-pulse">
    <td className="px-8 py-6 flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-100 rounded-xl" />
      <div>
        <div className="h-4 bg-slate-100 rounded w-32 mb-2" />
        <div className="h-3 bg-slate-50 rounded w-20" />
      </div>
    </td>
    <td className="px-8 py-6">
      <div className="h-6 bg-slate-100 rounded-full w-20" />
    </td>
    <td className="px-8 py-6">
      <div className="h-5 bg-slate-100 rounded w-16" />
    </td>
    <td className="px-8 py-6">
      <div className="h-6 bg-slate-100 rounded-lg w-12" />
    </td>
    <td className="px-8 py-6">
      <div className="h-8 bg-slate-50 rounded-xl w-24 ml-auto" />
    </td>
  </tr>
);

export default ProductList;
