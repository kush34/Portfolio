import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import { getBlogBySlug } from "../lib/loadBlog";
import { ImUndo2 } from "react-icons/im";
import keys from "ctrl-keys";
import PikachuCursor from "@/components/PickachuCursor";
import ShortcutModal from "@/components/ShortcutModel";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [customCurosr, setCustomCursor] = useState<boolean>(false);
  const handlerRef = useRef<ReturnType<typeof keys> | null>(null);
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

  useEffect(() => {
    const handler = keys();
    handlerRef.current = handler;

    handler.add("alt+a", () => {
      setTheme(prev => (prev === "dark" ? "light" : "dark"));
    });
    handler.add("alt+f", () => {
      window.open(`${import.meta.env.VITE_RESUME_LINK}`, "_blank", "noopener,noreferrer");
    });
    handler.add("alt+k", () => {
      setShowShortcuts((prev) => !prev)
    });

    handler.add("alt+w", () => {
      setCustomCursor(prev => !prev);
    });
    window.addEventListener("keydown", handler.handle);

    // cleanup or you deserve bugs
    return () => {
      window.removeEventListener("keydown", handler.handle);
    };
  }, []);
  if (!content) {
    return <p className="text-center text-zinc-400">Loading…</p>;
  }
  return (
    <div>
      <div className="mx-5 my-10 flex justify-end bg-background text-text">
        <button
          className="fixed shadow px-3 py-1 rounded text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ImUndo2 />
        </button>
      {customCurosr && <PikachuCursor />}

      </div>
      <BlogPost content={content} />
      {showShortcuts && <ShortcutModal onClose={() => setShowShortcuts(false)} />}
    </div>
  )
}
