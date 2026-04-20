"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { CommandMenu } from "./CommandMenu";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/blogs" },
  { name: "Projects", path: "/projects" },
];

export default function Navbar({ searchItems }: { searchItems: any[] }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <div className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-full shadow-lg pointer-events-auto transition-colors duration-300">
        <div className="flex items-center gap-1 mr-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-full ${
                pathname === item.path
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
              }`}
            >
              {pathname === item.path && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                />
              )}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="w-px h-6 bg-neutral-200 dark:border-neutral-800 mx-1" />

        <div className="flex items-center gap-2 ml-1">
          <CommandMenu items={searchItems} />
          
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 bg-neutral-100 dark:bg-neutral-900 rounded-full border border-neutral-200 dark:border-neutral-800 transition-colors"
            title={`Switch to ${theme === "light" ? "dark" : theme === "dark" ? "system" : "light"} mode`}
          >
            {theme === "light" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
