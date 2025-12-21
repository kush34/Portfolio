import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { getBlogBySlug } from "../lib/loadBlog";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug).then(setContent).catch(console.error);
  }, [slug]);

  if (!content) {
    return <p className="text-center text-zinc-400">Loading…</p>;
  }

  return <BlogPost content={content} />;
}
