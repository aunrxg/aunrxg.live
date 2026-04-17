"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface TooltipData {
  date: string;
  count: number;
  x: number;
  y: number;
}

export function HeatmapTooltip({ data }: { data: TooltipData | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {data && (
        <motion.div
          key={data.date}
          initial={{ opacity: 0, y: 5, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 0, x: "-50%" }}
          transition={{ duration: 0.1 }}
          style={{ left: data.x, top: data.y - 45 }}
          className="fixed bg-neutral-900 dark:bg-white text-white dark:text-black px-3 py-2 rounded-md text-xs font-mono z-50 pointer-events-none shadow-lg whitespace-nowrap"
        >
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-white dark:border-t-white"></div>
          {data.count} contributions on {data.date.split("-").reverse().join(".")}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
