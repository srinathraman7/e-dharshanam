import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket, ShoppingCart, Package, Trash2, Plus, Minus, MapPin, CheckCircle2,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { pujaItems, PujaItem } from "@/data/temples";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = [
  { id: "all", label: "All Items" },
  { id: "flowers", label: "🌸 Flowers" },
  { id: "lamps", label: "🪔 Lamps" },
  { id: "prasad", label: "🍬 Prasad" },
  { id: "essentials", label: "🕉️ Essentials" },
];

const springTransition = { type: "spring" as const, damping: 30, stiffness: 200 };

interface CartItem extends PujaItem {
  qty: number;
}

const InQueueOrder = () => {
  const [ticketId, setTicketId] = useState("");
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [deliveryMode, setDeliveryMode] = useState<"queue" | "gate">("queue");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredItems = useMemo(() =>
    selectedCategory === "all" ? pujaItems : pujaItems.filter((i) => i.category === selectedCategory),
    [selectedCategory]
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleVerify = () => {
    if (!ticketId.trim()) { toast.error("Enter your Ticket ID"); return; }
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      if (ticketId.length >= 4) {
        setVerified(true);
        toast.success("Ticket verified! You can now order puja items.");
      } else {
        toast.error("Invalid Ticket ID. Please check and try again.");
      }
    }, 1200);
  };

  const addToCart = (item: PujaItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    toast.success(`${item.name} added`);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => prev.map((c) => c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter((c) => c.qty > 0));
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) { toast.error("Cart is empty"); return; }
    setOrderPlaced(true);
    toast.success("Order placed successfully!");
  };

  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={springTransition}>
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-secondary" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">Your puja items will be {deliveryMode === "queue" ? "delivered to your queue position" : "ready for pickup at the gate"}.</p>
            <p className="text-sm text-muted-foreground mb-8">Order Total: ₹{cartTotal}</p>
            <button onClick={() => { setOrderPlaced(false); setCart([]); }} className="btn-divine">Order More Items</button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springTransition} className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">In-Queue Order</h1>
          <p className="text-muted-foreground">Order puja materials while you're in the darshan queue</p>
        </motion.div>

        {/* Ticket Verification */}
        {!verified ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.1 }} className="max-w-md mx-auto glass-card p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ticket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-semibold">Verify Your Ticket</h2>
                <p className="text-sm text-muted-foreground">Enter your booking ID to access the shop</p>
              </div>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Ticket ID (e.g., DD1A2B3C)"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-center text-lg tracking-wider"
              />
              <button onClick={handleVerify} disabled={verifying} className="btn-divine w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50">
                {verifying ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                ) : (
                  <Ticket className="w-5 h-5" />
                )}
                {verifying ? "Verifying..." : "Verify Ticket"}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Catalog */}
            <div className="lg:col-span-2 space-y-4">
              {/* Category Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-divine">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground shadow-divine"
                        : "bg-card border border-border hover:bg-accent/50"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Forgotten Items Message Box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springTransition, delay: 0.1 }}
                className="rounded-2xl p-5 border-2 border-dashed"
                style={{ borderColor: "hsl(43, 35%, 63%)", background: "hsl(35, 100%, 95%, 0.5)" }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🙏</span>
                  <div className="flex-1">
                    <h3 className="font-serif font-semibold text-sm mb-1">Bringing Forgotten Things to Dharshanam</h3>
                    <p className="text-xs text-muted-foreground mb-3">Forgot something essential? Describe what you need and we'll arrange it for you.</p>
                    <textarea
                      placeholder="Describe the item(s) you forgot (e.g., 'Extra coconut and red cloth for special puja')"
                      className="w-full px-3 py-2 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={() => toast.success("Request submitted! We'll arrange your items. 🙏")}
                      className="mt-2 btn-gold text-xs px-4 py-2 flex items-center gap-1.5"
                    >
                      <Package className="w-3.5 h-3.5" />
                      Submit to Dharshanam
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredItems.map((item, index) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...springTransition, delay: index * 0.03 }}
                      className="glass-card p-4 flex flex-col items-center text-center"
                    >
                      <span className="text-4xl mb-2">{item.image}</span>
                      <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      <p className="font-serif font-semibold text-primary mb-3">₹{item.price}</p>
                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center text-xs"><Minus className="w-3 h-3" /></button>
                          <span className="font-medium text-sm w-6 text-center">{inCart.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center text-xs"><Plus className="w-3 h-3" /></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="btn-divine text-xs px-4 py-2">Add to Cart</button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Cart Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...springTransition, delay: 0.2 }} className="lg:sticky lg:top-24">
              <div className="glass-card p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h2 className="font-serif text-lg font-semibold">Your Cart</h2>
                  {cart.length > 0 && <span className="ml-auto text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{cart.reduce((s, c) => s + c.qty, 0)}</span>}
                </div>

                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">Cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-divine">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 text-sm">
                          <span className="text-xl">{item.image}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-muted-foreground">₹{item.price} × {item.qty}</p>
                          </div>
                          <button onClick={() => updateQty(item.id, -item.qty)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Mode */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Delivery</label>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          { id: "queue" as const, label: "To Queue", icon: "📍" },
                          { id: "gate" as const, label: "Pickup at Gate", icon: "🚪" },
                        ]).map((mode) => (
                          <button
                            key={mode.id}
                            onClick={() => setDeliveryMode(mode.id)}
                            className={cn(
                              "flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm transition-all",
                              deliveryMode === mode.id
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border bg-card hover:bg-accent/50"
                            )}
                          >
                            <span>{mode.icon}</span>
                            <span className="font-medium">{mode.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <div className="flex justify-between mb-3">
                        <span className="text-muted-foreground">Total</span>
                        <span className="font-serif font-bold text-lg text-primary">₹{cartTotal}</span>
                      </div>
                      <button onClick={handlePlaceOrder} className="w-full py-3 rounded-xl font-medium bg-gradient-gold text-charcoal flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all shadow-gold">
                        <Package className="w-5 h-5" />
                        Place Order
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InQueueOrder;
