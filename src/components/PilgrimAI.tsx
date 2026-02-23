import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies: Record<string, string> = {
  "What should I wear to the temple?": "Most Hindu temples require modest, traditional attire. Men should wear dhoti/kurta or formal pants with a shirt. Women should wear saree, salwar kameez, or modest clothing. Avoid leather items and footwear inside the temple premises.",
  "What are the temple timings?": "Temple timings vary by location. Most temples open at 5:00 AM for morning puja and close by 9:00 PM. There's usually a break from 12:30 PM to 4:00 PM. Check the specific temple's detail page for accurate timings.",
  "How do I reach the temple?": "Each temple page has a dedicated Location section with an embedded map. Most major temples are well-connected by road, rail, and air. Local transport options like autos and buses are available from nearby cities.",
  "Can I carry my phone inside?": "Policies vary by temple. Some temples like Tirupati don't allow phones inside the sanctum. Others may allow them but prohibit photography. Check the temple's guidelines on its detail page before visiting.",
};

const defaultResponses = [
  "🙏 Namaste! I'd recommend checking the specific temple's detail page for the most accurate information. You can find it in our Temples section.",
  "That's a wonderful question! For detailed guidance, please visit the Help & Support page or check the temple-specific guidelines.",
  "I'm here to help with your spiritual journey! For specific booking queries, please contact our support team at 1800-XXX-XXXX.",
];

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

export const PilgrimAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "🙏 Namaste! I'm your Pilgrim's AI guide. Ask me anything about temples, darshan procedures, dress codes, or travel tips!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const match = Object.entries(quickReplies).find(([q]) =>
        userMsg.toLowerCase().includes(q.toLowerCase().split(" ").slice(1, 4).join(" "))
      );
      const reply = match?.[1] || defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, hsl(43 60% 55%), hsl(33 80% 50%))",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? "0 0 20px rgba(194,178,128,0.4)"
            : ["0 0 20px rgba(194,178,128,0.3)", "0 0 40px rgba(194,178,128,0.6)", "0 0 20px rgba(194,178,128,0.3)"],
        }}
        transition={{
          boxShadow: { repeat: isOpen ? 0 : Infinity, duration: 2 },
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={spring}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl overflow-hidden shadow-2xl border border-border/50"
            style={{ background: "hsl(var(--background))" }}
          >
            {/* Header */}
            <div className="px-5 py-4 flex items-center gap-3" style={{ background: "var(--gradient-vermillion)" }}>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-serif text-lg text-white">ॐ</span>
              </div>
              <div>
                <h3 className="font-serif font-semibold text-white text-sm">Pilgrim's AI</h3>
                <p className="text-white/70 text-xs">Your spiritual guide</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/70 text-xs">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-divine">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-card border border-border rounded-bl-md"
                    )}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-divine">
                {Object.keys(quickReplies).slice(0, 2).map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="px-3 py-1.5 rounded-full bg-card border border-border text-xs whitespace-nowrap hover:bg-accent/50 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about temples..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
