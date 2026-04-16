import { getAllPosts } from "@/lib/mdx";
import PostList from "@/components/PostList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of my engineering and design projects.",
};

export default function ProjectsPage() {
  const posts = getAllPosts("projects", "/projects");
  return <PostList posts={posts} title="Selected Projects" />;
}
