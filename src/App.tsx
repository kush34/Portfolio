"use client";

import { useState, useEffect, useRef } from "react";
import Profile from "@/components/Profile";
import ProjectCard from "@/components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";
import GitHubCalendar from "react-github-calendar";
import ExperienceCard from "@/components/ExperienceCard";
import BlogCard from "@/components/BlogCard";
import Tech from "@/components/Technology";


import PikachuCursor from "@/components/PickachuCursor";
import keys from 'ctrl-keys'
import ShortcutModal from "@/components/ShortcutModel";

import { blogs, companies, projects, techList, education } from "@/constants/data";
import FadeSection from "@/components/fade-section";
import LeetCodeStats from "@/components/leetcode";
import BackgroundPattern from "@/components/BackgroundPattern";


const App = () => {
  const handlerRef = useRef<ReturnType<typeof keys> | null>(null);
  const [customCurosr, setCustomCursor] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }
  const changeTheme = () => {
    if (!document.startViewTransition) {
      toggleTheme()
      return;
    }
    document.startViewTransition(() => {
      toggleTheme();
    })
  }


  const [visibleCount, setVisibleCount] = useState(6);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  useEffect(() => {
    const handler = keys();
    handlerRef.current = handler;

    handler.add("alt+a", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      setTheme(isDark ? "dark" : "light");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
    handler.add("alt+f", () => {
      window.open(`${process.env.NEXT_PUBLIC_RESUME_LINK}`, "_blank", "noopener,noreferrer");
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

  useEffect(() => {
    // keep the custom cursor off small screens only
    const updateCursor = () => {
      if (window.innerWidth < 1024) setCustomCursor(false);
    };
    updateCursor();
    window.addEventListener("resize", updateCursor);
    return () => window.removeEventListener("resize", updateCursor);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
    setTheme(saved === "dark" ? "dark" : "light");
  }, []);
  return (
    <div className="min-h-screen w-full relative">
      <div className="min-h-screen w-full relative ">
        {/* Cloudflare-style background pattern (remove or toggle anytime) */}
        <BackgroundPattern />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
          <Analytics />

          <div className="w-full max-w-5xl mx-auto flex flex-col gap-section py-section main">
            <FadeSection
            >
              <Profile toggleTheme={changeTheme} toggleModel={() => setShowShortcuts(true)} />
            </FadeSection>
            {showShortcuts && <ShortcutModal onClose={() => setShowShortcuts(false)} />}
            <FadeSection className="z-10 flex flex-col gap-row items-center justify-center">
              <h2 className="section-title">Tech Stack</h2>
              <div className="flex flex-wrap items-center justify-center gap-chip">
                {techList.map((t) => (
                  <Tech key={t.name} name={t.name} Icon={t.Icon} color={t.color} />
                ))}
              </div>
            </FadeSection>
            <FadeSection className="z-10 experience flex flex-col gap-card focus-dim">
              {companies.map((comp) =>
                <ExperienceCard key={comp.name} {...comp} theme={theme} />
              )}
            </FadeSection>
              <span className="text-xs text-muted-foreground">try alt+w 👀</span>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-card focus-dim">
              {projects.slice(0, visibleCount).map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}

            </section>
            {visibleCount < projects.length && (
              <div className="flex justify-center mt-6 px-4">
                <button
                  onClick={handleShowMore}
                  className="tech z-10 flex items-center hover:shadow justify-center gap-2 px-5 py-2 text-sm font-semibold border border-border rounded-xl cursor-pointer"
                >
                  Show more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            )}
            {/* <section className="flex flex-col justify-center items-center gap-5 px-4 mb-2 ">
                <h2 className="section-title z-10">Reviews</h2>
                <div className="z-10">
                  {reviews.map((item) => (
                    <Review key={item.id} {...item} />
                  ))}
                </div>
              </section> */}

            <FadeSection
             className="z-10 flex flex-col gap-row items-center justify-center py-10 rounded-2xl">
              <h2 className="section-title">Blogs</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-card">
                {blogs.map((blog, index) =>
                  <BlogCard key={index} {...blog} />
                )}
              </div>
            </FadeSection>
            <FadeSection
              className="z-10 flex flex-col gap-row items-center justify-center md:py-10 rounded-2xl">
              <h2 className="section-title">Leetcode Grind</h2>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-row w-full justify-center">
                <LeetCodeStats username="kush_34" />
                <div className="flex flex-col gap-4 w-full md:max-w-sm px-4 md:px-0 mt-4">
                  {education.map((e) => (
                    <a
                      key={e.name}
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-border px-5 py-4 hover:shadow hover:-translate-y-0.5 transition-all"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <img
                          src={e.imageLink}
                          alt={e.altImage}
                          className={`h-full w-full object-contain p-2 ${e.img_bg ?? ""}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold truncate">{e.name}</p>
                        <p className="text-sm text-muted-foreground">{e.position}</p>
                      </div>
                      <span className="ml-auto shrink-0 text-sm text-muted-foreground">
                        {e.time}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </FadeSection>
            <FadeSection
              className="w-full z-10 flex flex-col gap-row items-center justify-center md:py-10 rounded-2xl">
              <h2 className="section-title">Github Activity</h2>
              <div className="w-full github-cal">
                <GitHubCalendar
                  key={theme}
                  username="kush34"
                  colorScheme={theme}
                />
              </div>
            </FadeSection>
            <section className="z-10 px-4 mb-10 h-[10vh] text-center">
              <span className="text-muted-foreground text-center">Made with love by kush</span>
            </section>
            {customCurosr && <PikachuCursor />}
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;
