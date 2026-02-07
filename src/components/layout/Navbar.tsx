import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Search, X, Calendar, ShoppingBag, User, HelpCircle, LogIn } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Calendar, label: "Booking Slots", href: "/temples", status: "Live" },
  { icon: ShoppingBag, label: "My Orders", href: "/orders" },
  { icon: LogIn, label: "Login / Register", href: "/login" },
  { icon: HelpCircle, label: "Help & Support", href: "/help" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-xl hover:bg-accent/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-vermillion flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-xl">ॐ</span>
              </div>
              <span className="hidden sm:block font-serif text-xl font-semibold text-foreground">
                DivineDarshan
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by Temple, City, or God..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-divine w-full pl-12 pr-4 py-3 text-sm bg-card/80 text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/temples"
              className="hidden md:flex btn-divine items-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Darshan
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Side Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] glass-card z-50 border-r border-border/50"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-vermillion flex items-center justify-center">
                      <span className="text-primary-foreground font-serif text-2xl">ॐ</span>
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold">DivineDarshan</h2>
                      <p className="text-xs text-muted-foreground">Sacred Temple Bookings</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl hover:bg-accent/50 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300",
                          location.pathname === item.href
                            ? "bg-primary text-primary-foreground shadow-divine"
                            : "hover:bg-accent/50 text-foreground"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                        {item.status && (
                          <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-secondary/20 text-secondary">
                            {item.status}
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs text-center text-muted-foreground">
                    © 2025 DivineDarshan. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
