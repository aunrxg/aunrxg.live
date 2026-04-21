"use client";

import { useRef } from "react";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import OnekoCat from "./OnekoCat";
import RotatingHeadline from "./RatateHeading";
import FadeIn from "./FadeIn";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();
  console.log(theme);

  return (
    <section className="flex flex-col items-start mt-6 md:mt-0">
      <FadeIn delay={0.1} className="flex items-end gap-6 md:gap-8 mb-8 relative">
        <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 border-[3px] border-white dark:border-neutral-900 shadow-sm relative group">
          <Image
            src={theme === "dark" ? "/saitama.jpg" : "/saitama2.jpeg"}
            alt="Anurag Poddar"
            className="w-full h-full object-cover"
            width={128}
            height={128}
            priority
          />
        </div>
        <AnimatePresence>
          {theme === "light" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10, x: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 10, x: 10 }}
              className="absolute -top-6 left-24 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 rounded-2xl rounded-bl-none shadow-xl z-20"
            >
              <p className="text-[10px] md:text-xs font-medium text-neutral-600 dark:text-neutral-300 whitespace-nowrap">
                Ugh Light mode?
              </p>
              {/* Thought bubble tail */}
              <div className="absolute -bottom-1 left-0 w-2 h-2 bg-white dark:bg-neutral-800 border-l border-b border-neutral-200 dark:border-neutral-700 -rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col relative">
          <OnekoCat titleRef={titleRef} />
          <h1
            ref={titleRef}
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-2 text-neutral-900 dark:text-neutral-50 flex items-center gap-2 border-y border-neutral-200 dark:border-neutral-800 py-1"
          >
            Anurag Poddar
            <BadgeCheck size={24} className="text-[#000000] fill-[#0A84FF]" />
          </h1>
          <RotatingHeadline headlines={["Full Stack Developer", "AI Engineer"]} />
        </div>
      </FadeIn>
    </section>
  );
}
