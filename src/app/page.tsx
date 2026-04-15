import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SmartTitle from "@/components/SmartTitle";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative pt-20">
        <div className="mb-10 w-full flex justify-center">
          <SmartTitle title="Detecting Support for Division in Calc()" />
        </div>
        <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mb-12 font-light mix-blend-multiply">
          A buttery smooth portfolio experience built with Next.js, Framer Motion, and Lenis. Emphasizing typography, space, and motion.
        </p>
        
        <Link 
          href="/about"
          className="group flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:opacity-70 transition-opacity"
        >
          Discover Next Page
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        <div className="absolute bottom-12 text-xs uppercase tracking-widest text-neutral-400">
          Scroll to explore
        </div>
      </section>

      {/* Content Section to test scrolling */}
      <section className="min-h-screen px-6 py-24 max-w-4xl mx-auto flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8">
          The aesthetics of silence.
        </h2>
        <p className="text-lg text-neutral-700 font-light leading-relaxed mb-6">
          In a world increasingly cluttered with information and aggressive visual noise, minimalist design acts as a quiet rebellion. We strip away the unnecessary, not to empty the space, but to let the essential speak more clearly.
        </p>
        <p className="text-lg text-neutral-700 font-light leading-relaxed">
          Through the precise application of typography, grid systems, and buttery smooth interactions, the interface becomes invisible, leaving only the experience.
        </p>
      </section>
    </main>
  );
}
