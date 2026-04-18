"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PostMeta } from "@/lib/mdx";

export default function PostList({ posts, title }: { posts: PostMeta[], title: string }) {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-32">
        <motion.h1 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-sans tracking-tight font-bold mb-16"
        >
          {title}
        </motion.h1>
        
        <div className="flex flex-col gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="group block">
                <article className="border-b border-neutral-200 dark:border-neutral-800 pb-10">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <time className="text-xs uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400 mb-3 block">
                        {post.formattedDate}
                      </time>
                      <Link href={post.url} className="text-2xl md:text-3xl font-medium group-hover:text-[#61afef] transition-colors inline-block">
                        {post.title}
                      </Link>
                    </div>
                    <div className="flex gap-3 items-center mt-7 ml-4 shrink-0">
                      {post.githubUrl && (
                        <a href={post.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="GitHub Repository">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
                        </a>
                      )}
                      {post.liveUrl && (
                        <a href={post.liveUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Live Demo">
                          <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <div className="flex justify-between items-end mt-2">
                    <div className="flex gap-2 flex-wrap">
                      {post.tags?.map(tag => (
                        <span key={tag} className="px-2 py-1 text-[10px] uppercase font-mono rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors pointer-events-none">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={post.url} className="text-xs font-mono lowercase text-neutral-400 hover:text-[#61afef] transition-colors group-hover:underline pl-4 whitespace-nowrap">
                      Read →
                    </Link>
                  </div>
                </article>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
