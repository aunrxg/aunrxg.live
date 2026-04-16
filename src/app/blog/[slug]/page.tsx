import { compileMDX } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import matter from "gray-matter";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

function getPostFilePath(slug: string) {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return null;
  const files = fs.readdirSync(contentDir);
  const matchedFile = files.find(file => file === `${slug}.mdx` || file.endsWith(`-${slug}.mdx`));
  return matchedFile ? path.join(contentDir, matchedFile) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filePath = getPostFilePath(slug);
  if (!filePath) return {};
  
  const source = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(source);
  
  return {
    title: data.title || "Blog Post",
    description: data.summary || "",
    openGraph: {
      title: data.title,
      description: data.summary,
      images: data.ogImage ? [{ url: data.ogImage }] : [],
    },
  };
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return { slug };
    });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const filePath = getPostFilePath(slug);
  
  if (!filePath) {
    return (
      <main className="min-h-screen grid place-items-center">
        404 I haven't blogged this yet
      </main>
    );
  }

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, frontmatter } = await compileMDX<{
    title: string;
    summary: string;
    tags: string[];
    ogImage?: string;
  }>({
    source,
    components: MDXComponents,
    options: { parseFrontmatter: true },
  });

  const fileName = path.basename(filePath);
  const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
  const dateString = dateMatch ? dateMatch[1] : null;
  const formattedDate = dateString ? format(parseISO(dateString), "MMMM do, yyyy") : "";

  return (
    <main className="min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:opacity-70 transition-opacity mb-10 text-[#61afef]"
        >
          <ArrowLeft className="w-4 h-4 ml-1" />
          ALL POSTS
        </Link>

        <header className="mb-12 flex flex-col items-start gap-4">
          {formattedDate && (
            <time className="text-sm uppercase tracking-widest font-medium text-neutral-500 dark:text-neutral-400">
              {formattedDate}
            </time>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <div className="flex gap-2">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs font-mono rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:text-neutral-900 dark:prose-headings:text-[#e0e0e0] prose-a:text-[#61afef]">
          {content}
        </article>
      </div>
    </main>
  );
}
