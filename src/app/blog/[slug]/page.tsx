import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXComponents } from "@/components/mdx/MDXComponents";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(contentDir)) return [];
  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.mdx`);
  
  let source = "";
  try {
    source = fs.readFileSync(filePath, "utf-8");
  } catch (e) {
    return (
      <main className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen grid place-items-center">
        404 I haven't talked about this yet
      </main>
    );
  }

  return (
    <main className="bg-[#0b0c10] text-[#c5c6c7] min-h-screen selection:bg-[#c678dd]/30">
      <div className="max-w-3xl mx-auto px-6 py-20 md:py-32">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium hover:opacity-70 transition-opacity mb-16 text-[#61afef]"
        >
          <ArrowLeft className="w-4 h-4 ml-1" />
          ALL POSTS
        </Link>
        
        <article className="prose prose-invert max-w-none prose-headings:text-[#e0e0e0] prose-a:text-[#61afef]">
          <MDXRemote source={source} components={MDXComponents} />
        </article>
      </div>
    </main>
  );
}
