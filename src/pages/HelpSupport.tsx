import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Send, Mail, Phone, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const faqs = [
  {
    q: "How do I book a darshan ticket?",
    a: "Navigate to the Temples page, select your preferred temple, choose a date and time slot, then proceed to checkout. You'll receive a confirmation with a QR code.",
  },
  {
    q: "What is '2Day Book' (Tatkal)?",
    a: "2Day Book is our last-minute booking system. It opens slots 24–48 hours before the visit date for devotees who need urgent darshan bookings.",
  },
  {
    q: "How does In-Queue Order work?",
    a: "Once you have a valid booking ticket, enter your Ticket ID on the In-Queue Order page. You can then browse and order puja materials that will be delivered to your queue position or kept for pickup at the gate.",
  },
  {
    q: "Can I cancel or reschedule my booking?",
    a: "Yes, bookings can be cancelled or rescheduled up to 4 hours before the scheduled darshan time. Visit My Orders, select the booking, and choose the appropriate option.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept UPI, credit/debit cards, net banking, and popular wallets. All transactions are secured with 256-bit encryption.",
  },
  {
    q: "Is there a dress code for temple visits?",
    a: "Each temple has specific guidelines. Check the temple details page for dress code information. Generally, traditional and modest attire is recommended.",
  },
];

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you shortly. 🙏");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={spring} className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Help & Support</h1>
          <p className="text-muted-foreground">Find answers or reach out to our team</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* FAQ Section */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-serif text-xl font-semibold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: index * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full p-4 flex items-center justify-between text-left gap-3"
                  >
                    <span className="font-medium text-sm">{faq.q}</span>
                    <ChevronDown className={cn("w-4 h-4 shrink-0 text-muted-foreground transition-transform", openIndex === index && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ ...spring, delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="font-serif text-xl font-semibold">Contact Us</h2>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button type="submit" className="btn-divine w-full py-3 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>

            {/* Quick Contact */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="glass-card p-4 flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Call Us</p>
                  <p className="text-sm font-medium">1800-XXX-XXXX</p>
                </div>
              </div>
              <div className="glass-card p-4 flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium">help@divine.in</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupport;
