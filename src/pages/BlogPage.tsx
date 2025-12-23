import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { getBlogBySlug } from "../lib/loadBlog";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!slug) return;
    getBlogBySlug(slug).then(setContent).catch(console.error);
  }, [slug]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  if (!content) {
    return <p className="text-center text-zinc-400">Loading…</p>;
  }
  return (
    <div>
      <div className="mx-5 my-10 flex justify-end bg-background text-text">
        <button
          className="shadow px-3 py-1 rounded text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Back
        </button>

      </div>
      <BlogPost content={content} />
    </div>
  )
}
