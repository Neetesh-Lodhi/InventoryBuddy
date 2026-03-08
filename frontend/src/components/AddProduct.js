import { useEffect, useState } from "react";
import API from "../api";
import {
  Plus,
  Edit3,
  Package,
  Tag,
  DollarSign,
  Hash,
  Truck,
  X,
  CheckCircle2,
} from "lucide-react";

function AddProduct({ refreshProducts, editProduct, setEditProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
      setIsExpanded(true); // Auto-open when editing
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setEditProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });
    setIsExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editProduct) {
        await API.put(`/products/${editProduct._id}`, formData);
        setEditProduct(null);
      } else {
        await API.post("/products", formData);
      }
      setFormData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        supplier: "",
      });
      refreshProducts();
      setIsExpanded(false);
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-10 transition-all duration-500 ease-in-out">
      {/* Toggle Header - Desktop Pro Style */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-3 text-slate-500 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50/30 transition-all group"
        >
          <div className="p-2 bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white rounded-full transition-colors">
            <Plus size={20} />
          </div>
          <span className="font-bold tracking-tight text-lg">
            Create New Inventory Entry
          </span>
        </button>
      ) : (
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-indigo-100/50 overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="px-8 py-6 bg-slate-900 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500 rounded-xl">
                {editProduct ? <Edit3 size={20} /> : <Plus size={20} />}
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                {editProduct ? "Modify Product Details" : "Register New Asset"}
              </h2>
            </div>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Product Identity
                </label>
                <div className="relative group">
                  <Package
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="name"
                    placeholder="Enter item name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Classification
                </label>
                <div className="relative group">
                  <Tag
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="category"
                    placeholder="e.g. Electronics, Office"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Unit Valuation
                </label>
                <div className="relative group">
                  <DollarSign
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Stock Amount
                </label>
                <div className="relative group">
                  <Hash
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="quantity"
                    type="number"
                    placeholder="Total units"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Supplier */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">
                  Vendor/Supplier
                </label>
                <div className="relative group">
                  <Truck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"
                    size={18}
                  />
                  <input
                    name="supplier"
                    placeholder="Enter vendor name..."
                    value={formData.supplier}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={20} />
                {editProduct ? "Confirm Changes" : "Create Product"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
