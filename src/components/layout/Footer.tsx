import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-charcoal text-primary-foreground">
      {/* Divine Divider */}
      <div className="h-1 bg-gradient-to-r from-transparent via-sandalwood to-transparent" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-vermillion flex items-center justify-center">
                <span className="text-primary-foreground font-serif text-2xl">ॐ</span>
              </div>
              <span className="font-serif text-2xl font-semibold">DivineDarshan</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Experience the divine through seamless temple bookings across India. 
              Your spiritual journey begins here.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-4 text-sandalwood">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Popular Temples", "Book Darshan", "My Orders", "Help Center"].map((item) => (
                <li key={item}>
                  <Link
                    to="/temples"
                    className="text-primary-foreground/70 hover:text-sandalwood transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-4 text-sandalwood">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-5 h-5 shrink-0 text-sandalwood" />
                <span>Temple Complex, Sacred Street, New Delhi, 110001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-5 h-5 shrink-0 text-sandalwood" />
                <span>+91 1800-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-5 h-5 shrink-0 text-sandalwood" />
                <span>namaste@divinedarshan.in</span>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-serif text-lg font-semibold mb-4 text-sandalwood">
              Follow Divine Blessings
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Twitter, label: "Twitter" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-sandalwood hover:text-charcoal transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-primary-foreground/50">
              Subscribe to our newsletter for divine updates
            </p>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/50">
            © 2025 DivineDarshan. All rights reserved. Made with 🙏 in India.
          </p>
          <div className="flex gap-6 text-xs text-primary-foreground/50">
            <a href="#" className="hover:text-sandalwood transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sandalwood transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-sandalwood transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
