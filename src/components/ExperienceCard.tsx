"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ExperienceCardProps {
  period: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  bullets: string[];
}

export default function ExperienceCard({
  period,
  role,
  company,
  description,
  technologies,
  bullets
}: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 group">
      <time className="text-sm font-mono text-neutral-500 whitespace-nowrap min-w-[150px] mt-1">
        {period}
      </time>
      <div className="flex-1">
        <div 
          className="cursor-pointer group/header"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-50 group-hover/header:text-[#61afef] transition-colors">
              {role} <span className="text-neutral-400 font-light group-hover/header:text-neutral-500 transition-colors">@{company}</span>
            </h3>
            <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {technologies.map(tech => (
              <span key={tech} className="px-2 py-1 text-[10px] md:text-xs uppercase font-mono rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                {tech}
              </span>
            ))}
          </div>

          <p className={`text-neutral-600 dark:text-neutral-400 font-light text-sm leading-relaxed ${!expanded ? "line-clamp-2" : "mb-4"}`}>
            {description}
          </p>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="list-disc pl-5 space-y-2 mt-2 text-neutral-600 dark:text-neutral-400 font-light text-sm leading-relaxed">
                {bullets.map((bullet, idx) => (
                  <li key={idx} className="pl-1 marker:text-neutral-300 dark:marker:text-neutral-700">{bullet}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
