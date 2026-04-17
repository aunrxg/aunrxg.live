"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CommitActivity } from "@/lib/github";

interface CommitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string | null;
  commits: CommitActivity[];
  loading: boolean;
}

export function CommitsModal({ isOpen, onClose, date, commits, loading }: CommitsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.6 }} 
            exit={{ opacity: 0 }} 
            className="absolute inset-0 bg-black" 
            onClick={onClose} 
          />
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: 20, scale: 0.95 }} 
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl md:rounded-3xl p-6 z-50 shadow-2xl max-h-[85vh] flex flex-col"
          >
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-medium tracking-tight">Commits on <span className="text-[#61afef]">{date}</span></h3>
               <button onClick={onClose} className="p-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-full transition-colors flex place-items-center justify-center w-8 h-8 text-sm">✕</button>
             </div>
             
             <div className="overflow-y-auto pr-2 grow custom-scrollbar">
               {loading ? (
                 <div className="animate-pulse space-y-4 py-4 mt-2">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-5/6 mt-6"></div>
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/3"></div>
                 </div>
               ) : commits.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-10 text-center opacity-60">
                   <p className="italic">No public commits verified by GitHub search.</p>
                   <p className="text-xs mt-2 font-mono">(Contributions may refer to issues, PRs, or private repositories)</p>
                 </div>
               ) : (
                 <ul className="space-y-3 mt-2">
                   {commits.map(c => (
                     <li key={c.id} className="border border-neutral-100 dark:border-neutral-800/50 bg-neutral-50 dark:bg-neutral-800/20 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-4 rounded-xl transition-colors group">
                       <a href={c.url} target="_blank" rel="noopener noreferrer" className="block">
                         <span className="font-mono text-xs text-[#c678dd] mb-2 block">{c.repo}</span>
                         <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">{c.message}</p>
                       </a>
                     </li>
                   ))}
                 </ul>
               )}
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
