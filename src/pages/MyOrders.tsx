import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Clock, CheckCircle2, Truck, MapPin, ChevronDown, ShoppingBag } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

type OrderStatus = "pending" | "in-queue" | "delivered" | "completed";

interface Order {
  id: string;
  templeName: string;
  date: string;
  items: { name: string; qty: number; price: number }[];
  status: OrderStatus;
  deliveryMode: string;
  total: number;
}

const statusConfig: Record<OrderStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-500/20 text-yellow-700", icon: Clock },
  "in-queue": { label: "In Queue", color: "bg-blue-500/20 text-blue-700", icon: Truck },
  delivered: { label: "Delivered", color: "bg-green-500/20 text-green-700", icon: CheckCircle2 },
  completed: { label: "Completed", color: "bg-primary/20 text-primary", icon: CheckCircle2 },
};

const mockOrders: Order[] = [
  {
    id: "DD8K2M4N",
    templeName: "Meenakshi Amman Temple",
    date: "2025-06-15",
    items: [
      { name: "Rose Garland", qty: 2, price: 150 },
      { name: "Coconut", qty: 1, price: 40 },
    ],
    status: "in-queue",
    deliveryMode: "Deliver to Queue",
    total: 340,
  },
  {
    id: "DD3P7R1Q",
    templeName: "Tirupati Balaji",
    date: "2025-06-14",
    items: [
      { name: "Prasad Kit (Premium)", qty: 1, price: 500 },
      { name: "Oil Lamp (Brass)", qty: 2, price: 200 },
    ],
    status: "delivered",
    deliveryMode: "Pickup at Gate",
    total: 900,
  },
  {
    id: "DD6L9W5X",
    templeName: "Golden Temple",
    date: "2025-06-13",
    items: [{ name: "Marigold Bundle", qty: 3, price: 80 }],
    status: "completed",
    deliveryMode: "Deliver to Queue",
    total: 240,
  },
  {
    id: "DD1A4C8E",
    templeName: "Kedarnath Temple",
    date: "2025-06-12",
    items: [
      { name: "Camphor Pack", qty: 1, price: 60 },
      { name: "Incense Bundle", qty: 2, price: 80 },
    ],
    status: "pending",
    deliveryMode: "Pickup at Gate",
    total: 220,
  },
];

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  // Simulated real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.status === "pending" && Math.random() > 0.7) return { ...o, status: "in-queue" as OrderStatus };
          if (o.status === "in-queue" && Math.random() > 0.85) return { ...o, status: "delivered" as OrderStatus };
          return o;
        })
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track your puja material orders in real-time</p>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-divine">
          {(["all", "pending", "in-queue", "delivered", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                filter === f ? "bg-primary text-primary-foreground shadow-divine" : "bg-card border border-border hover:bg-accent/50"
              )}
            >
              {f === "all" ? "All Orders" : statusConfig[f].label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">No orders found</p>
          </motion.div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {filtered.map((order, index) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;
              const isExpanded = expandedId === order.id;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: index * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                    className="w-full p-4 md:p-5 flex items-center gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-serif font-semibold truncate">{order.templeName}</h3>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1", config.color)}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">#{order.id} · {order.date}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif font-bold text-primary">₹{order.total}</p>
                      <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform mx-auto mt-1", isExpanded && "rotate-180")} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 border-t border-border/50 pt-4 space-y-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span>{item.name} × {item.qty}</span>
                              <span className="text-muted-foreground">₹{item.price * item.qty}</span>
                            </div>
                          ))}
                          <div className="pt-2 border-t border-border/30 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {order.deliveryMode}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
