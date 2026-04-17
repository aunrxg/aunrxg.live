import { getAllPosts } from "@/lib/mdx";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import SmartTitle from "@/components/SmartTitle";
import FadeIn from "@/components/FadeIn";
import GithubHeatmapServer from "@/components/github/GithubHeatmapServer";

export default function Home() {
  const latestBlogs = getAllPosts("blog", "/blog").slice(0, 3);
  const latestProjects = getAllPosts("projects", "/projects").slice(0, 2);

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        {/* HERO SECTION */}
        <section className="mb-32 flex flex-col items-start bg-grid-slate-100">
          <FadeIn delay={0.1} className="mb-8 w-full">
            <SmartTitle title="Software Engineer & Designer" />
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-light text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl mb-8">
              I craft buttery smooth, high-aesthetic web experiences. Passionate about modern web ecosystems, dynamic architectures, and finding beauty in the details.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
              {/* <Github className="w-5 h-5 text-neutral-700 dark:text-neutral-300" /> */} github
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
              {/* <Twitter className="w-5 h-5 text-neutral-700 dark:text-neutral-300" /> */} twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
              {/* <Linkedin className="w-5 h-5 text-neutral-700 dark:text-neutral-300" /> */} Linkedin
            </a>
            <a href="mailto:hello@example.com" className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
              <Mail className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </a>
          </FadeIn>
        </section>

        {/* GITHUB SECTION */}
        <FadeIn delay={0.35} className="w-full">
          <GithubHeatmapServer />
        </FadeIn>

        {/* PROJECTS SECTION */}
        <FadeIn delay={0.4} className="mb-32">
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-3xl font-medium tracking-tight">Selected Projects</h2>
            <Link href="/projects" className="text-sm font-medium hover:text-[#61afef] transition-colors flex items-center gap-1 uppercase tracking-widest">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestProjects.map((post) => (
              <Link href={post.url} key={post.slug} className="group block bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-medium group-hover:text-[#61afef] transition-colors">{post.title}</h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 font-light mb-8 text-sm md:text-base leading-relaxed flex-grow">{post.summary}</p>
                <div className="flex gap-2 flex-wrap mt-auto">
                  {post.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-[10px] md:text-xs uppercase font-mono rounded bg-white dark:bg-black text-neutral-600 dark:text-neutral-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
            {latestProjects.length === 0 && (
              <p className="text-neutral-500 font-light italic">No projects found.</p>
            )}
          </div>
        </FadeIn>

        {/* BLOG SECTION */}
        <FadeIn delay={0.5}>
          <div className="flex justify-between items-end mb-10 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <h2 className="text-3xl font-medium tracking-tight">Recent Writing</h2>
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
      </div>
    </main>
  );
}
