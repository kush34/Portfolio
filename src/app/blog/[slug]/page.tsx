import { notFound } from "next/navigation";
import BlogView from "@/components/BlogView";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/loadBlog";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let content: string;
  try {
    content = getBlogBySlug(slug);
  } catch {
    notFound();
  }

  return <BlogView content={content} />;
}
