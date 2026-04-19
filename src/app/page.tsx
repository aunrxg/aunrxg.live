import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Mail } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import GithubHeatmapServer from "@/components/github/GithubHeatmapServer";
import Image from "next/image";

export default function Home() {
  const latestBlogs = getAllPosts("blog", "/blog").slice(0, 3);
  const latestProjects = getAllPosts("projects", "/projects").slice(0, 2);

  return (
    <main className="min-h-screen">
      <div className="max-w-[700px] mx-auto px-6 py-20 md:py-32">
        {/* HERO SECTION */}
        <section className="flex flex-col items-start">
          <FadeIn delay={0.1} className="flex items-end gap-6 md:gap-8 mb-8">
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800 border-[3px] border-white dark:border-neutral-900 shadow-sm relative">
               <Image src="/avatar.jpg" alt="Anurag Poddar" className="w-full h-full object-cover" width={128} height={128} priority />
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1 text-neutral-900 dark:text-neutral-50 flex items-center gap-2 border-y border-neutral-200 dark:border-neutral-800 py-1">
                Anurag Poddar
                <BadgeCheck size={24} className="text-[#000000] fill-[#0A84FF]" />
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 font-mono text-xs md:text-base mt-1">
                Full Stack Developer · AI Engineer
              </p>
            </div>
          </FadeIn>
        </section>

        {/* SOCIAL LINKS */}
        <section className="">
          <FadeIn delay={0.2} className="pl-2">
            <div className="flex gap-5 items-center text-neutral-400 dark:text-neutral-500">
              <a href="#" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-black dark:hover:text-white transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="#" aria-label="GitHub" className="hover:text-black dark:hover:text-white transition-colors">
                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
              </a>
              <a href="#" aria-label="Email" className="hover:text-black dark:hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>
        </section>

        {/* ABOUT SECTION */}
        <section className="mb-24">
          <FadeIn delay={0.25} className="mt-10 max-w-2xl text-neutral-600 dark:text-neutral-400 font-light text-sm md:text-base leading-relaxed">
            <p>
              I am a Full Stack Developer and AI Engineer obsessed with building elegant, highly performant software. My work spans across modern web architectures, crafting scalable backend systems, and experimenting with artificial intelligence to push the boundaries of digital products. When I'm not writing code, I enjoy exploring open-source tools and refining minimal design aesthetics.
            </p>
          </FadeIn>
        </section>

        {/* GITHUB SECTION */}
        <FadeIn delay={0.35} className="w-full">
          <GithubHeatmapServer />
        </FadeIn>

        {/* BLOG SECTION */}
        <FadeIn delay={0.4} className="mb-32">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Recent Writing</h2>
            <Link href="/blogs" className="text-sm font-medium hover:text-[#c678dd] transition-colors flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-col gap-8">
            {latestBlogs.map(post => (
              <Link href={post.url} key={post.slug} className="group block">
                <article className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 hover:bg-neutral-50 dark:hover:bg-neutral-900 p-4 -mx-4 rounded-xl transition-colors">
                  <time className="text-sm font-mono text-neutral-500 whitespace-nowrap min-w-[150px]">
                    {post.formattedDate}
                  </time>
                  <div>
                    <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-[#c678dd] transition-colors">{post.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm line-clamp-2">{post.summary}</p>
                  </div>
                </article>
              </Link>
            ))}
            {latestBlogs.length === 0 && (
              <p className="text-neutral-500 font-light italic">No posts found.</p>
            )}
          </div>
        </FadeIn>

        {/* PROJECTS SECTION */}
        <FadeIn delay={0.5} className="mb-32">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Selected Projects</h2>
            <Link href="/projects" className="text-sm font-medium hover:text-[#61afef] transition-colors flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestProjects.map((post) => (
              <div key={post.slug} className="group bg-neutral-50 dark:bg-neutral-900 rounded-2xl md:p-4 border border-neutral-200 dark:border-neutral-800 transition-colors h-full flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700">
                <div className="flex justify-between items-start mb-4">
                  <Link href={post.url} className="text-xl md:text-2xl font-medium transition-colors group-hover:text-[#61afef]">
                    {post.title}
                  </Link>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 font-light mb-8 text-sm md:text-base leading-relaxed grow">
                  {post.summary}
                </p>
                <div className="flex justify-between items-end mt-auto">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags?.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] md:text-xs uppercase font-mono rounded bg-white dark:bg-black text-neutral-600 dark:text-neutral-400 pointer-events-none">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-end mt-3">
                  <div className="flex gap-3 items-center mt-1">
                    {post.githubUrl && (
                      <Link href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub Repository">
                         <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                      </Link>
                    )}
                    {post.liveUrl && (
                      <Link href={post.liveUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Live Demo">
                        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </Link>
                    )}
                  </div>
                  <Link href={post.url} className="text-sm mr-5 font-mono lowercase text-neutral-400 hover:text-[#61afef] transition-colors group-hover:underline pl-4 whitespace-nowrap">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
            {latestProjects.length === 0 && (
              <p className="text-neutral-500 font-light italic">No projects found.</p>
            )}
          </div>
        </FadeIn>

        {/* EXPERIENCE SECTION */}
        <FadeIn delay={0.6}>
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Experience</h2>
          </div>
          <div className="flex flex-col gap-8">
            <article className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 group">
              <time className="text-sm font-mono text-neutral-500 whitespace-nowrap min-w-[150px]">
                2024 — Present
              </time>
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-50">
                  AI Engineer <span className="text-neutral-400 font-light">@ Stealth Startup</span>
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm leading-relaxed">
                  Leading the architecture and development of high-performance web applications using Next.js and React. Designing scalable backend systems and integrated AI models to enhance core product features.
                </p>
              </div>
            </article>

            <article className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 group">
              <time className="text-sm font-mono text-neutral-500 whitespace-nowrap min-w-[150px]">
                2022 — 2024
              </time>
              <div>
                <h3 className="text-lg md:text-xl font-medium mb-2 text-neutral-900 dark:text-neutral-50">
                  Full Stack Developer <span className="text-neutral-400 font-light">@ Creative Agency</span>
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm leading-relaxed">
                  Developed award-winning landing pages and digital experiences for premium brands. Focused heavily on smooth animations, accessibility, and pixel-perfect UI implementations.
                </p>
              </div>
            </article>
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
