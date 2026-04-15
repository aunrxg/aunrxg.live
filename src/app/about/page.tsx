import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function About() {
  return (
    <main className="flex-1">
      <section className="flex flex-col justify-center min-h-screen px-6 max-w-4xl mx-auto">
        <Link 
          href="/"
          className="group flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:opacity-70 transition-opacity mb-12"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <h1 className="text-5xl md:text-8xl font-medium tracking-tight mb-8">
          About this project.
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 font-light leading-relaxed">
          The seamless transition you just experienced is powered by Framer Motion's AnimatePresence tracking the Next.js router path.
        </p>
      </section>
    </main>
  );
}
