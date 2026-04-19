"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Headlines {
  headlines: string[];
}

export default function RotatingHeadline({ headlines }: Headlines) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 1500);
    return () => clearInterval(timer);
  }, [headlines]);

  return (
    <div className="h-6 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={headlines[index]}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-neutral-500 dark:text-neutral-400 font-mono text-xs md:text-base absolute inset-0"
        >
          {headlines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
