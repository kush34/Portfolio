const blogFiles = import.meta.glob("../content/blog/*.md", {
  as: "raw",
});

export async function getBlogBySlug(slug: string): Promise<string> {
  const path = `../content/blog/${slug}.md`;

  const loader = blogFiles[path];
  if (!loader) {
    throw new Error("Blog not found");
  }

  return await loader();
}

export function getAllBlogSlugs(): string[] {
  return Object.keys(blogFiles).map((path) =>
    path.split("/").pop()!.replace(".md", "")
  );
}
