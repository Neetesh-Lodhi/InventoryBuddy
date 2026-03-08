import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  X,
  MessageSquare,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Loader2,
} from "lucide-react";
import API from "../api";

function AIChat() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi there! I'm your Inventory Intelligence Bot. Ask me about stock levels, top categories, or low-stock alerts!",
    },
  ]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await API.post("/ai/chat", { message: input });
      const aiReply = { sender: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I'm having trouble connecting to the neural network. Please try again later.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-sans">
      <AnimatePresence>
        {/* --- FLOATING TOGGLE BUTTON --- */}
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 bg-slate-900 text-white pl-5 pr-6 py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-700/50 group overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <MessageSquare size={22} className="relative z-10" />
            <span className="font-bold tracking-tight relative z-10">
              AI Assistant
            </span>
            <div className="absolute -right-1 -top-1 w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
          </motion.button>
        )}

        {/* --- CHAT INTERFACE --- */}
        {open && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className="w-[380px] h-[550px] bg-white/95 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.25)] rounded-[2.5rem] border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 px-6 py-5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-indigo-500/20 rounded-xl border border-indigo-400/30">
                  <Sparkles className="text-indigo-400" size={18} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm tracking-wide">
                    BudgetBuddy AI
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Active System
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white transition-colors relative z-10"
              >
                <Minimize2 size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:20px_20px] bg-[position:0_0]"
            >
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ x: msg.sender === "user" ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  key={i}
                  className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
                      msg.sender === "user"
                        ? "bg-slate-100 border-slate-200"
                        : "bg-indigo-600 border-indigo-500"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      <User size={14} className="text-slate-600" />
                    ) : (
                      <Bot size={14} className="text-white" />
                    )}
                  </div>
                  <div
                    className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm font-medium leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-br-none"
                        : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center border border-indigo-500">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-bl-none">
                    <Loader2
                      size={16}
                      className="text-indigo-600 animate-spin"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
              <div className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-2 py-2 focus-within:ring-4 focus-within:ring-indigo-50 focus-within:border-indigo-500 transition-all">
                <input
                  className="flex-1 bg-transparent px-3 py-2 outline-none text-sm font-medium text-slate-700 placeholder:text-slate-400"
                  placeholder="Ask something..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-center text-slate-400 mt-3 font-bold uppercase tracking-widest">
                AI can provide insights based on current stock
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AIChat;
