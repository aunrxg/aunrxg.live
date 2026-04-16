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
              <Link href={post.url} className="group block">
                <article className="border-b border-neutral-200 dark:border-neutral-800 pb-10">
                  <time className="text-xs uppercase tracking-widest font-mono text-neutral-500 dark:text-neutral-400 mb-3 block">
                    {post.formattedDate}
                  </time>
                  <h2 className="text-2xl md:text-3xl font-medium mb-3 group-hover:text-[#61afef] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-[10px] uppercase font-mono rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-200 dark:group-hover:bg-neutral-800 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
