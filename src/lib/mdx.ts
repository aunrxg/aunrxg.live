import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format, parseISO } from "date-fns";

export interface PostMeta {
  title: string;
  summary: string;
  tags: string[];
  ogImage?: string;
  date: string;
  formattedDate: string;
  slug: string;
  url: string;
  githubUrl?: string;
  liveUrl?: string;
}

export function getAllPosts(directory: string, baseUrl: string): PostMeta[] {
  const contentDir = path.join(process.cwd(), "src/content", directory);
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const source = fs.readFileSync(path.join(contentDir, file), "utf-8");
      const { data } = matter(source);
      
      const fileName = file.replace(/\.mdx$/, "");
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      const dateString = dateMatch ? dateMatch[1] : null;
      const formattedDate = dateString ? format(parseISO(dateString), "MMMM do, yyyy") : "";
      
      const slug = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, "");

      return {
        title: data.title || fileName,
        summary: data.summary || "",
        tags: data.tags || [],
        ogImage: data.ogImage || undefined,
        date: dateString || "1970-01-01",
        formattedDate,
        slug,
        url: `${baseUrl}/${slug}`,
        githubUrl: data.githubUrl || undefined,
        liveUrl: data.liveUrl || undefined,
      };
    })
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));
}
