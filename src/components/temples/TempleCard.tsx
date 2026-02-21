import { motion } from "framer-motion";
import { MapPin, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface TempleCardProps {
  id: string;
  name: string;
  location: string;
  image: string;
  deity: string;
  rating: number;
  timings: string;
  index: number;
}

const spring = { type: "spring" as const, damping: 30, stiffness: 200 };

export const TempleCard = ({
  id, name, location, image, deity, rating, timings, index,
}: TempleCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ ...spring, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link to={`/temple/${id}`}>
        <article className="temple-card group">
          <div className="relative h-56 overflow-hidden">
            <img src={image} alt={name} className="temple-card-image w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass-card flex items-center gap-1.5">
              <Star className="w-4 h-4 text-marigold fill-marigold" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">{deity}</div>
          </div>
          <div className="p-5">
            <h3 className="font-serif text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{name}</h3>
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3"><MapPin className="w-4 h-4" /><span>{location}</span></div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm"><Clock className="w-4 h-4" /><span>{timings}</span></div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="btn-divine text-center text-sm">Book Darshan</div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};
