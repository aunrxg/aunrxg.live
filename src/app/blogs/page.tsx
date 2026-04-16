import { getAllPosts } from "@/lib/mdx";
import PostList from "@/components/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Writing and thoughts on engineering and design.",
};

export default function BlogsPage() {
  const posts = getAllPosts("blog", "/blogs");
  return <PostList posts={posts} title="Thoughts & Writings" />;
}
