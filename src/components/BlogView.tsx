"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import keys from "ctrl-keys";

import BlogPost from "@/components/BlogPost";
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

export default function BlogView({
  content,
}: {
  content: string;
}) {
  const router = useRouter();

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [customCursor, setCustomCursor] = useState(false);

  const handlerRef = useRef<ReturnType<typeof keys> | null>(null);

  useEffect(() => {
    setTheme(
      localStorage.getItem("theme") === "dark" ? "dark" : "light"
    );
  }, []);

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
        process.env.NEXT_PUBLIC_RESUME_LINK,
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
              <TooltipTrigger
                id="blog-back-trigger"
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push("/")}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                }
              />

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
        <BlogPost content={content} />
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
