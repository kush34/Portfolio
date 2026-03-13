import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogPost from "../components/BlogPost";
import { getBlogBySlug } from "../lib/loadBlog";
import { ImUndo2 } from "react-icons/im";

type Blog = {
  title: string;
  content: string;
  time: string;
  link: string;
};

const blogs: Blog[] = [
  {
    title: "My First Interview Experience",
    content: "My Interview experience at a firm in Mumbai",
    time: "04 March 2026",
    link: "/blog/Interview",
  },
  {
    title: "Making an App out of spite | GeoImg",
    content: "Making an app after getting frustated from Ads",
    time: "10 Feb 2026",
    link: "/blog/GeoImg",
  },
  {
    title: "How to be sane when developing complex application | Testing with Jest",
    content: "I was doing development on my project and after some time i did some code refactoring...",
    time: "1 Nov 2025",
    link: "/blog/testing",
  },
  {
    title: "Suchale | chat application | MERN Stack + Redis",
    content: "Explaining Websocket and Chat App in detail",
    time: "1 Nov 2025",
    link: "/blog/Suchale",
  },
];

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const blogMeta = blogs.find((b) => b.link === `/blog/${slug}`);

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
      {blogMeta && (
        <Helmet>
          <title>{blogMeta.title} | Kush's Blog</title>
          <meta name="description" content={blogMeta.content} />
          <meta property="og:title" content={blogMeta.title} />
          <meta property="og:description" content={blogMeta.content} />
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={blogMeta.time} />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blogMeta.title,
              description: blogMeta.content,
              datePublished: blogMeta.time,
              author: { "@type": "Person", name: "Kush" },
              url: `https://portfolio-kush34s-projects.vercel.app${blogMeta.link}`,
            })}
          </script>
        </Helmet>
      )}

      <div className="mx-5 my-10 flex justify-end bg-background text-text">
        <button
          className="shadow px-3 py-1 rounded text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ImUndo2 />
        </button>
      </div>
      <BlogPost content={content} />
    </div>
  );
}
