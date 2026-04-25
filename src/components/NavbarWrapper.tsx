import { getAllPosts } from "@/lib/mdx";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const blogs = getAllPosts("blog", "/blogs");
  const projects = getAllPosts("projects", "/projects");

  const searchItems = [
    ...blogs.map((b) => ({ id: b.slug, title: b.title, url: b.url, type: "blog" as const })),
    ...projects.map((p) => ({ id: p.slug, title: p.title, url: p.url, type: "project" as const })),
  ];

  return <Navbar searchItems={searchItems} />;
}
