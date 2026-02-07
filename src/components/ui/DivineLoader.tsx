import { motion } from "framer-motion";

export const DivineLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full border-4 border-sandalwood/30 border-t-sandalwood flex items-center justify-center"
        >
          <span className="text-3xl text-vermillion animate-pulse">ॐ</span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground font-medium"
        >
          Seeking divine blessings...
        </motion.p>
      </div>
    </div>
  );
};
