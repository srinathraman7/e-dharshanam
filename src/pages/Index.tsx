import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, Calendar, Shield, Zap, ShoppingCart } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TempleCard } from "@/components/temples/TempleCard";
import { temples } from "@/data/temples";
import heroTemple from "@/assets/hero-temple.jpg";
import mandalaPattern from "@/assets/mandala-pattern.png";

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

const features = [
  { icon: Calendar, title: "Easy Booking", description: "Book darshan tickets in advance with just a few clicks" },
  { icon: MapPin, title: "All India Coverage", description: "Access to temples across every state and union territory" },
  { icon: Shield, title: "Secure & Trusted", description: "Safe payments and verified temple partnerships" },
  { icon: Zap, title: "2Day Book", description: "Last-minute tatkal darshan slots with fast checkout" },
  { icon: ShoppingCart, title: "In-Queue Order", description: "Order puja materials while waiting in the darshan queue" },
];

const Index = () => {
  const popularTemples = temples.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroTemple} alt="Sacred Temple" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-background" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.img initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.1, scale: 1 }} transition={{ duration: 2, ease: "easeOut" }} src={mandalaPattern} alt="" className="w-[1000px] h-[1000px] animate-mandala" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={spring}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...spring, delay: 0.15 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground mb-6">
              <Sparkles className="w-4 h-4 text-marigold" />
              <span className="text-sm font-medium">Experience the Divine</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              Your Sacred Journey<br /><span className="text-gradient-gold">Begins Here</span>
            </h1>

            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Book darshan tickets to the most revered temples across India. Experience seamless spiritual journeys with DivineDarshan.
            </p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...spring, delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/temples" className="btn-divine inline-flex items-center gap-2 text-lg px-8 py-4">
                Explore Temples <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/tatkal" className="btn-gold inline-flex items-center gap-2 text-lg px-8 py-4">
                <Zap className="w-5 h-5" /> 2Day Book
              </Link>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 rounded-full bg-primary-foreground/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-saffron">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring} className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Why Choose DivineDarshan?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">We make your spiritual journey seamless and memorable</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ ...spring, delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 text-center hover:shadow-hover transition-shadow duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-vermillion flex items-center justify-center shadow-divine">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Temples Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring} className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Popular Temples</h2>
              <p className="text-muted-foreground max-w-xl">Discover the most visited sacred destinations across India</p>
            </div>
            <Link to="/temples" className="mt-4 md:mt-0 inline-flex items-center gap-2 text-primary font-medium hover:underline">
              View All Temples <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemples.map((temple, index) => (
              <TempleCard key={temple.id} id={temple.id} name={temple.name} location={temple.location} image={temple.image} deity={temple.deity} rating={temple.rating} timings={temple.timings} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-vermillion" />
        <div className="absolute inset-0 mandala-bg opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={spring}>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Begin Your<br />Spiritual Journey?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">Join thousands of devotees who have found peace through our platform</p>
            <Link to="/temples" className="btn-gold inline-flex items-center gap-2 text-lg px-10 py-4">
              Start Booking <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
