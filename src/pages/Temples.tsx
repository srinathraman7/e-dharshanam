import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, ChevronDown } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { TempleCard } from "@/components/temples/TempleCard";
import { temples, states, deityCategories } from "@/data/temples";
import heroTemple from "@/assets/hero-temple.jpg";

const Temples = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("All");
  const [selectedDeity, setSelectedDeity] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTemples = useMemo(() => {
    return temples.filter((temple) => {
      const matchesSearch =
        temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        temple.deity.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesState = selectedState === "All" || temple.state === selectedState;
      const matchesDeity = selectedDeity === "All" || temple.deityCategory === selectedDeity;

      return matchesSearch && matchesState && matchesDeity;
    });
  }, [searchQuery, selectedState, selectedDeity]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroTemple}
            alt="Temple"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground mb-4"
          >
            Sacred Temples of India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Book your divine darshan at the most revered temples across the nation
          </motion.p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="container mx-auto px-4 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 md:p-6"
        >
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search temples, cities, or deities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors md:w-auto"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* State Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Filter by State</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="All">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Deity Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Filter by Deity</label>
                <div className="flex flex-wrap gap-2">
                  {deityCategories.map((deity) => (
                    <button
                      key={deity}
                      onClick={() => setSelectedDeity(deity)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedDeity === deity
                          ? "bg-primary text-primary-foreground shadow-divine"
                          : "bg-card border border-border hover:bg-accent/50"
                      }`}
                    >
                      {deity}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Temple Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredTemples.length > 0 ? (
          <>
            <p className="text-muted-foreground mb-6">
              Showing {filteredTemples.length} temple{filteredTemples.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemples.map((temple, index) => (
                <TempleCard
                  key={temple.id}
                  id={temple.id}
                  name={temple.name}
                  location={temple.location}
                  image={temple.image}
                  deity={temple.deity}
                  rating={temple.rating}
                  timings={temple.timings}
                  index={index}
                />
              ))}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-2xl font-semibold mb-2">No temples found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default Temples;
