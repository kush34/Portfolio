import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";
import keys from "ctrl-keys";

import BlogPost from "../components/BlogPost";
import { getBlogBySlug } from "../lib/loadBlog";
import PikachuCursor from "@/components/PickachuCursor";
import ShortcutModal from "@/components/ShortcutModel";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);
  const [content, setContent] = useState("");

  const handlerRef = useRef<ReturnType<typeof keys> | null>(null);

  useEffect(() => {
    if (!slug) return;

    getBlogBySlug(slug)
      .then(setContent)
      .catch(console.error);
  }, [slug]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = keys();
    handlerRef.current = handler;

    handler.add("alt+a", () =>
      setTheme((prev) => (prev === "dark" ? "light" : "dark"))
    );

    handler.add("alt+f", () => {
      window.open(
        import.meta.env.VITE_RESUME_LINK,
        "_blank",
        "noopener,noreferrer"
      );
    });

    handler.add("alt+k", () =>
      setShowShortcuts((prev) => !prev)
    );

    handler.add("alt+w", () =>
      setCustomCursor((prev) => !prev)
    );

    window.addEventListener("keydown", handler.handle);

    return () => {
      window.removeEventListener("keydown", handler.handle);
    };
  }, []);

  if (!content) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-8 w-96" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                Back to Portfolio
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-muted-foreground">
            Blog
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <BlogPost slug={slug} content={content} />
      </main>

      {customCursor && <PikachuCursor />}

      {showShortcuts && (
        <ShortcutModal
          onClose={() => setShowShortcuts(false)}
        />
      )}
    </>
  );
}