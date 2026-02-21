import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { format, addDays, isToday, isTomorrow } from "date-fns";
import {
  Zap, Clock, AlertCircle, Users, IndianRupee, ChevronRight, Timer,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { temples } from "@/data/temples";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TimeSlot = "morning" | "afternoon" | "evening";
const timeSlots: { id: TimeSlot; label: string; time: string }[] = [
  { id: "morning", label: "Morning", time: "6:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM - 5:00 PM" },
  { id: "evening", label: "Evening", time: "5:00 PM - 9:00 PM" },
];

const springTransition = { type: "spring" as const, damping: 30, stiffness: 200 };

const TatkalBooking = () => {
  const navigate = useNavigate();
  const tatkalTemples = useMemo(() => temples.filter((t) => t.tatkalAvailable), []);
  const [selectedTemple, setSelectedTemple] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(addDays(new Date(), 1));
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();
  const [ticketCount, setTicketCount] = useState(1);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);

  // Countdown to next slot opening (midnight)
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();
      setCountdown({
        hours: Math.floor(diff / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);
  const dates = [tomorrow, dayAfter];

  const handleCheckAvailability = () => {
    if (!selectedTemple) { toast.error("Please select a temple"); return; }
    setChecking(true);
    setAvailable(null);
    setTimeout(() => {
      setChecking(false);
      setAvailable(Math.random() > 0.2);
    }, 1500);
  };

  const temple = temples.find((t) => t.id === selectedTemple);

  const handleFastCheckout = () => {
    if (!selectedSlot || !temple) { toast.error("Select a time slot"); return; }
    navigate("/confirmation", {
      state: {
        temple,
        date: selectedDate,
        slot: timeSlots.find((s) => s.id === selectedSlot),
        ticketCount,
        ticketType: "tatkal",
        totalAmount: ticketCount * (temple.ticketPrice > 0 ? temple.ticketPrice * 1.5 : 200),
      },
    });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-vermillion opacity-5" />
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springTransition} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive" />
              </span>
              <span className="text-sm font-medium text-destructive">LIVE — Tatkal Booking</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3">2Day Book</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Last-minute darshan slots available 24–48 hours before your visit. Fast checkout, instant confirmation.</p>
          </motion.div>

          {/* Countdown */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...springTransition, delay: 0.1 }} className="flex justify-center gap-4 mb-12">
            {[
              { val: countdown.hours, label: "Hours" },
              { val: countdown.minutes, label: "Minutes" },
              { val: countdown.seconds, label: "Seconds" },
            ].map((item) => (
              <div key={item.label} className="glass-card p-4 text-center min-w-[80px]">
                <span className="text-3xl font-serif font-bold text-primary">{String(item.val).padStart(2, "0")}</span>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">until next<br/>slot opens</p>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...springTransition, delay: 0.2 }} className="max-w-2xl mx-auto glass-card p-6 md:p-8 space-y-6">
            {/* Temple Select */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Temple</label>
              <select
                value={selectedTemple}
                onChange={(e) => { setSelectedTemple(e.target.value); setAvailable(null); }}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Choose a temple...</option>
                {tatkalTemples.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} — {t.location}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">Select Date (Next 2 days only)</label>
              <div className="grid grid-cols-2 gap-3">
                {dates.map((d) => (
                  <button
                    key={d.toISOString()}
                    onClick={() => { setSelectedDate(d); setAvailable(null); }}
                    className={cn(
                      "flex flex-col items-center px-4 py-3 rounded-xl border transition-all",
                      selectedDate.toDateString() === d.toDateString()
                        ? "bg-primary text-primary-foreground border-primary shadow-divine"
                        : "border-border bg-card hover:bg-accent/50"
                    )}
                  >
                    <span className="font-medium">{isTomorrow(d) ? "Tomorrow" : format(d, "EEEE")}</span>
                    <span className="text-sm opacity-80">{format(d, "MMM d")}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Check Availability */}
            <button
              onClick={handleCheckAvailability}
              disabled={checking || !selectedTemple}
              className="btn-divine w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {checking ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
              ) : (
                <Zap className="w-5 h-5" />
              )}
              {checking ? "Checking..." : "Check Availability"}
            </button>

            {/* Availability Result */}
            <AnimatePresence>
              {available !== null && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={springTransition}>
                  {available ? (
                    <div className="space-y-6 pt-4 border-t border-border">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                        <AlertCircle className="w-5 h-5 text-secondary" />
                        <span className="text-sm font-medium">Slots available! Book now before they fill up.</span>
                      </div>

                      {/* Time Slot */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Time Slot</label>
                        <div className="grid grid-cols-3 gap-2">
                          {timeSlots.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={cn(
                                "flex flex-col items-center px-3 py-3 rounded-xl border text-sm transition-all",
                                selectedSlot === slot.id
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border bg-card hover:bg-accent/50"
                              )}
                            >
                              <span className="font-medium">{slot.label}</span>
                              <span className="text-xs opacity-80 mt-0.5">{slot.time}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Count */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Devotees</label>
                        <div className="flex items-center gap-3">
                          <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent/50">-</button>
                          <span className="w-8 text-center font-medium">{ticketCount}</span>
                          <button onClick={() => setTicketCount(Math.min(5, ticketCount + 1))} className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-accent/50">+</button>
                        </div>
                      </div>

                      {/* Fast Checkout */}
                      <button onClick={handleFastCheckout} className="w-full py-4 rounded-xl font-medium transition-all bg-gradient-gold text-charcoal flex items-center justify-center gap-2 hover:-translate-y-0.5 shadow-gold">
                        <Zap className="w-5 h-5" />
                        Fast Checkout
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                      <AlertCircle className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="font-medium text-sm">No slots available</p>
                        <p className="text-xs text-muted-foreground">Try a different date or time. New slots open at midnight.</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TatkalBooking;
