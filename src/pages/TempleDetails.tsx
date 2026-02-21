import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  MapPin, Clock, Star, Users, IndianRupee, Calendar, ArrowLeft,
  ChevronDown, Shirt, Sun, Landmark, Info,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { temples } from "@/data/temples";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type TimeSlot = "morning" | "afternoon" | "evening";
const timeSlots: { id: TimeSlot; label: string; time: string }[] = [
  { id: "morning", label: "Morning", time: "6:00 AM - 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM - 5:00 PM" },
  { id: "evening", label: "Evening", time: "5:00 PM - 9:00 PM" },
];

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

const TempleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const temple = temples.find((t) => t.id === id);

  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot>();
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketType, setTicketType] = useState<"regular" | "vip">("regular");

  if (!temple) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">Temple Not Found</h1>
          <button onClick={() => navigate("/temples")} className="btn-divine">Back to Temples</button>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedSlot) { toast.error("Please select a date and time slot"); return; }
    navigate("/confirmation", {
      state: {
        temple, date: selectedDate,
        slot: timeSlots.find((s) => s.id === selectedSlot),
        ticketCount, ticketType,
        totalAmount: ticketCount * (ticketType === "vip" ? temple.vipPrice : temple.ticketPrice),
      },
    });
  };

  const totalPrice = ticketCount * (ticketType === "vip" ? temple.vipPrice : temple.ticketPrice);

  return (
    <Layout>
      {/* Parallax Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 1.2, ease: "easeOut" }} className="absolute inset-0">
          <img src={temple.image} alt={temple.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-charcoal/30 to-transparent" />
        </motion.div>

        <button onClick={() => navigate("/temples")} className="absolute top-24 left-4 md:left-8 z-10 flex items-center gap-2 px-4 py-2 rounded-full glass-card text-foreground hover:bg-card/90 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Temples</span>
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm mb-4">{temple.deity}</span>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-4">{temple.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                <span className="flex items-center gap-2"><MapPin className="w-5 h-5" />{temple.location}</span>
                <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{temple.timings}</span>
                <span className="flex items-center gap-2"><Star className="w-5 h-5 fill-marigold text-marigold" />{temple.rating} Rating</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="glass-card p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">About the Temple</h2>
              <p className="text-muted-foreground leading-relaxed">{temple.description}</p>
            </motion.div>

            {/* Rich Details Accordion */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.1 }} className="glass-card p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Temple Information</h2>
              <Accordion type="multiple" className="space-y-2">
                <AccordionItem value="history" className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3"><Landmark className="w-5 h-5 text-primary" /> History & Significance</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">{temple.history}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="best-time" className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3"><Sun className="w-5 h-5 text-secondary" /> Best Time to Visit</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed">{temple.bestTimeToVisit}</p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="dress-code" className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3"><Shirt className="w-5 h-5 text-accent" /> Dress Code & Guidelines</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground leading-relaxed mb-3">{temple.dressCode}</p>
                    <ul className="space-y-2">
                      {temple.guidelines.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          {g}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="nearby" className="border border-border rounded-xl px-4">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3"><MapPin className="w-5 h-5 text-marigold" /> Nearby Attractions</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {temple.nearbyAttractions.map((a, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          {a}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>

            {/* Map */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.2 }} className="glass-card p-6">
              <h2 className="font-serif text-2xl font-semibold mb-4">Location</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${temple.coordinates.lng}!3d${temple.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${temple.coordinates.lat}°N+${temple.coordinates.lng}°E!5e0!3m2!1sen!2sin!4v1234567890`}
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column - Booking */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.3 }} className="lg:sticky lg:top-24">
            <div className="glass-card p-6 space-y-6">
              <h2 className="font-serif text-2xl font-semibold">Book Darshan</h2>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card text-left hover:bg-accent/50 transition-colors", !selectedDate && "text-muted-foreground")}>
                      <Calendar className="w-5 h-5" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={(date) => date < new Date()} initialFocus className="pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-medium mb-2">Select Time Slot</label>
                <div className="grid grid-cols-1 gap-2">
                  {timeSlots.map((slot) => (
                    <button key={slot.id} onClick={() => setSelectedSlot(slot.id)} className={cn("flex items-center justify-between px-4 py-3 rounded-xl border transition-all", selectedSlot === slot.id ? "bg-primary text-primary-foreground border-primary shadow-divine" : "border-border bg-card hover:bg-accent/50")}>
                      <span className="font-medium">{slot.label}</span>
                      <span className="text-sm opacity-80">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ticket Type */}
              <div>
                <label className="block text-sm font-medium mb-2">Ticket Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setTicketType("regular")} className={cn("flex flex-col items-center px-4 py-3 rounded-xl border transition-all", ticketType === "regular" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-card hover:bg-accent/50")}>
                    <span className="font-medium">Regular</span>
                    <span className="text-sm flex items-center mt-1"><IndianRupee className="w-3 h-3" />{temple.ticketPrice || "Free"}</span>
                  </button>
                  {temple.vipPrice > 0 && (
                    <button onClick={() => setTicketType("vip")} className={cn("flex flex-col items-center px-4 py-3 rounded-xl border transition-all", ticketType === "vip" ? "bg-gradient-gold text-charcoal border-sandalwood" : "border-border bg-card hover:bg-accent/50")}>
                      <span className="font-medium">VIP</span>
                      <span className="text-sm flex items-center mt-1"><IndianRupee className="w-3 h-3" />{temple.vipPrice}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Ticket Count */}
              <div>
                <label className="block text-sm font-medium mb-2">Number of Devotees</label>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-accent/50 transition-colors">-</button>
                  <div className="flex items-center gap-2 text-lg font-medium"><Users className="w-5 h-5 text-muted-foreground" />{ticketCount}</div>
                  <button onClick={() => setTicketCount(Math.min(10, ticketCount + 1))} className="w-10 h-10 rounded-xl border border-border bg-card flex items-center justify-center hover:bg-accent/50 transition-colors">+</button>
                </div>
              </div>

              {/* Total */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="text-2xl font-serif font-semibold flex items-center"><IndianRupee className="w-5 h-5" />{totalPrice || "Free"}</span>
                </div>
                <button onClick={handleBooking} className="btn-divine w-full py-4 text-lg animate-glow-pulse">Book Darshan</button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TempleDetails;
