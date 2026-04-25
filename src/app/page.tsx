import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Mail } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import GithubHeatmapServer from "@/components/github/GithubHeatmapServer";
import Hero from "@/components/Hero";
import { IconTwitter, IconLinkedIn, IconGithub } from "@/constants/Icons";
import ExperienceCard from "@/components/ExperienceCard";


export default function Home() {
  const latestBlogs = getAllPosts("blog", "/blog").slice(0, 3);
  const latestProjects = getAllPosts("projects", "/projects").slice(0, 2);


  return (
    <main className="min-h-screen">
      <div className="max-w-[700px] mx-auto px-6 py-20 md:py-32">
        {/* HERO SECTION */}
        <Hero />

        {/* SOCIAL LINKS */}
        <section className="mb-24">
          <FadeIn delay={0.2} className="pl-2">
            <div className="flex gap-5 items-center text-neutral-400 dark:text-neutral-500">
              <Link title="X (Twitter)" href="https://x.com/aunrxg" aria-label="X (Twitter)" className="hover:text-black dark:hover:text-white transition-colors">
                <IconTwitter />
              </Link>
              <Link title="LinkedIn" href="https://linkedin.com/in/anurag-poddar-dev" aria-label="LinkedIn" className="hover:text-black dark:hover:text-white transition-colors">
                <IconLinkedIn />
              </Link>
              <Link title="Github" href="https://github.com/aunrxg" aria-label="GitHub" className="hover:text-black dark:hover:text-white transition-colors">
                <IconGithub />
              </Link>
              <Link title="Gmail" href="mailto:anuragpoddar9484@gmail.com" aria-label="Email" className="hover:text-black dark:hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </FadeIn>
        </section>

        {/* ABOUT SECTION */}
        <FadeIn delay={0.25} className="mb-24">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-2xl font-medium tracking-tight">About Me</h2>
          </div>
          <div className="max-w-2xl text-neutral-600 dark:text-neutral-400 font-light text-sm md:text-base leading-relaxed">
            <ul className="list-disc pl-5 space-y-3 marker:text-neutral-300 dark:marker:text-neutral-700">
              <li>I am a Full Stack Developer and AI Engineer obsessed with building elegant, highly performant software.</li>
              <li>My work spans across modern web architectures, crafting scalable backend systems, and experimenting with artificial intelligence to push the boundaries of digital products.</li>
              <li>When I'm not writing code, I enjoy exploring open-source tools and refining minimal design aesthetics.</li>
            </ul>
          </div>
        </FadeIn>

        {/* GITHUB SECTION */}
        <FadeIn delay={0.35} className="w-full">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-2xl font-medium tracking-tight">Contributions</h2>
          </div>
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
              <div key={post.slug} className="group bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-4 border border-neutral-200 dark:border-neutral-800 transition-colors h-full flex flex-col hover:border-neutral-300 dark:hover:border-neutral-700">
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
                  <Link href={post.url} className="text-sm font-mono lowercase text-neutral-400 hover:text-[#61afef] transition-colors group-hover:underline pr-2 whitespace-nowrap">
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
            <ExperienceCard
              period="Dec 2024 — Apr 2025"
              role="Web Developer"
              company="Saral Startup School"
              description="During my internship at Saral Startup School, an early-stage startup, I worked on a large-scale Next.js monorepo under a technical lead.  My work involved building and improving production ui components, fixing existing issues and optimizing performance."
              technologies={["Next.js", "Strapi", "Tailwind CSS", "TypeScript"]}
              bullets={[
                "Reduced LCP by 57% (4.2s to 1.8s), CLS by 89% (0.18 to 0.02), and INP by 68% (350ms to 110ms) by optimizing Tailwind CSS and image dimensions.",
                "Led redesign of course page and developed a new blog section to enhance content discoverability and drive organic traffic improving SEO.",
                "Integrated Strapi CMS APIs using SSR, improving content delivery speed and reducing client-side fetch overhead.",
              ]}
            />
          </div>
        </FadeIn>

      </div>
    </main>
  );
}
