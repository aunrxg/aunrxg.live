"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Link from "next/link";
import { IconGithub, IconLinkedIn, IconTwitter } from "@/constants/Icons";

const contactLinks = [
  {
    name: "Email",
    value: "anuragpoddar9484@gmail.com",
    href: "mailto:anuragpoddar9484@gmail.com",
    icon: Mail,
    color: "hover:text-red-500",
  },
  {
    name: "Twitter / X",
    value: "@aunrxg",
    href: "https://x.com/aunrxg",
    icon: IconTwitter,
    color: "hover:text-blue-400",
  },
  {
    name: "GitHub",
    value: "github.com/aunrxg",
    href: "https://github.com/aunrxg",
    icon: IconGithub,
    color: "hover:text-neutral-900 dark:hover:text-white",
  },
  {
    name: "LinkedIn",
    value: "@anurag-poddar-dev",
    href: "https://linkedin.com/in/anurag-poddar-dev",
    icon: IconLinkedIn,
    color: "hover:text-blue-600",
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen py-32 px-6">
      <div className="max-w-[700px] mx-auto">
        <FadeIn delay={0.1}>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-neutral-900 dark:text-neutral-50">
            Get in touch
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-lg md:text-xl font-light mb-16 leading-relaxed max-w-xl">
            Have a project in mind or just want to chat? Feel free to reach out through any of these platforms.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactLinks.map((link, i) => (
            <FadeIn key={link.name} delay={0.2 + i * 0.1}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex items-center justify-between p-6 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 ${link.color}`}
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700 group-hover:scale-110 transition-transform duration-300">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-mono uppercase tracking-widest text-neutral-400 mb-0.5">
                      {link.name}
                    </p>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {link.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-neutral-300 group-hover:text-current transition-colors" />
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8} className="mt-24 text-center">
          <p className="text-sm font-mono text-neutral-400">
            Based in India · Working Globally
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
