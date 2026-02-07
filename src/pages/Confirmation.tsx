import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  Download,
  Share2,
  Home,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl mb-4">No Booking Found</h1>
          <Link to="/temples" className="btn-divine inline-block">
            Browse Temples
          </Link>
        </div>
      </Layout>
    );
  }

  const { temple, date, slot, ticketCount, ticketType, totalAmount } = bookingData;
  const bookingId = `DD${Date.now().toString(36).toUpperCase()}`;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-secondary" />
            </motion.div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground">
              May your visit bring you divine blessings
            </p>
          </div>

          {/* Ticket Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-vermillion p-6 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-semibold mb-1">{temple.name}</h2>
                  <p className="opacity-80 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {temple.location}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs opacity-70">Booking ID</span>
                  <p className="font-mono font-bold">{bookingId}</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-medium">{format(new Date(date), "PPP")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Time Slot</p>
                    <p className="font-medium">{slot.label}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Devotees</p>
                    <p className="font-medium">{ticketCount} Person(s)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IndianRupee className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Ticket Type</p>
                    <p className="font-medium capitalize">{ticketType}</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-border my-6 relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
                <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
              </div>

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 bg-card border-2 border-dashed border-border rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-charcoal rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 ${Math.random() > 0.5 ? "bg-primary-foreground" : "bg-charcoal"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Show this QR code at the temple entrance
                </p>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between py-4 px-6 bg-muted/20 rounded-xl">
                <span className="font-medium">Total Paid</span>
                <span className="text-2xl font-serif font-bold flex items-center text-primary">
                  <IndianRupee className="w-5 h-5" />
                  {totalAmount || "Free"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
                <Download className="w-5 h-5" />
                Download
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Confirmation;
