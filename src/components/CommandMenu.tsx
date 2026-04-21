"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, FileText, Layout, Moon, Sun, X, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

interface SearchItem {
  id: string;
  title: string;
  url: string;
  type: "blog" | "project";
}

export function CommandMenu({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  // Toggle the menu when ⌘K or Ctrl+K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 rounded-md border border-neutral-200 dark:border-neutral-800 transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-800 px-1.5 font-mono text-[10px] font-medium text-neutral-600 dark:text-neutral-400 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-100 flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-neutral-50/40 dark:bg-neutral-950/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden"
            >
              <Command className="flex flex-col h-full overflow-hidden">
                <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4">
                  <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                  <Command.Input
                    autoFocus
                    placeholder="Type a command or search..."
                    className="flex-1 h-14 bg-transparent border-none focus:outline-none focus:ring-0 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 px-4"
                  />
                  <button 
                    onClick={() => setOpen(false)}
                    className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                <Command.List className="max-h-[350px] overflow-y-auto p-2 custom-scrollbar">
                  <Command.Empty className="py-6 text-center text-sm text-neutral-500">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Navigation" className="px-2 py-3 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <Layout className="w-4 h-4" />
                      Home
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/blogs"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Blogs
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/projects"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <Layout className="w-4 h-4" />
                      Projects
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => router.push("/contact"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Contact
                    </Command.Item>
                  </Command.Group>

                  {items.length > 0 && (
                    <Command.Group heading="Content" className="px-2 py-3 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                      {items.map((item) => (
                        <Command.Item
                          key={item.id}
                          onSelect={() => runCommand(() => router.push(item.url))}
                          className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                        >
                          {item.type === "blog" ? <FileText className="w-4 h-4" /> : <Layout className="w-4 h-4" />}
                          {item.title}
                        </Command.Item>
                      ))}
                    </Command.Group>
                  )}

                  <Command.Group heading="Theme" className="px-2 py-3 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                    <Command.Item
                      onSelect={() => runCommand(() => setTheme("light"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <Sun className="w-4 h-4" />
                      Light Mode
                    </Command.Item>
                    <Command.Item
                      onSelect={() => runCommand(() => setTheme("dark"))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-neutral-700 dark:text-neutral-300 rounded-lg cursor-pointer aria-selected:bg-neutral-100 dark:aria-selected:bg-neutral-800 aria-selected:text-neutral-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <Moon className="w-4 h-4" />
                      Dark Mode
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
