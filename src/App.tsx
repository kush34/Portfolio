import { useState, useEffect, useRef } from "react";
import Profile from "@/components/Profile";
import ProjectCard from "@/components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import ExperienceCard from "@/components/ExperienceCard";
import BlogCard from "@/components/BlogCard";
import Review from "@/components/Review";
import Tech from "@/components/Technology";


import PikachuCursor from "@/components/PickachuCursor";
import keys from 'ctrl-keys'
import ShortcutModal from "@/components/ShortcutModel";

import LeetCodeStats from "@/components/leetcode";
import { blogs, companies, projects, reviews, techList } from "@/constants/data";




const App = () => {
  const handlerRef = useRef<ReturnType<typeof keys> | null>(null);
  const [customCurosr, setCustomCursor] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
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

  const [blockSize, setBlockSize] = useState(10);
  const [blockMargin, setBlockMargin] = useState(5);
  const [fontSize, setFontSize] = useState(14);
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

  useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      if (w < 200) {
        setCustomCursor(false);
        setBlockSize(2);
        setBlockMargin(1);
        setFontSize(3);
      } else if (w < 480) {
        setCustomCursor(false);
        setBlockSize(5);
        setBlockMargin(1);
        setFontSize(4);
      } else if (w < 640) {
        setCustomCursor(false);
        setBlockSize(5);
        setBlockMargin(1);
        setFontSize(10);
        setFontSize(5);
      } else if (w < 1024) {
        setCustomCursor(false);
        setBlockSize(10);
        setBlockMargin(2);
        setFontSize(5);
      } else if (w < 1280) {
        setBlockSize(12);
        setBlockMargin(3);
        setFontSize(8);
      }
      else {
        setBlockSize(14);
        setBlockMargin(5);
        setFontSize(12);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="min-h-screen w-full relative">
      <div className="min-h-screen w-full relative ">
        <div
          className="absolute inset-0 z-0 "
        />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
          <Analytics />

          <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 py-24 main">
            <section className="">
              <Profile toggleTheme={changeTheme} toggleModel={() => setShowShortcuts(true)} />
            </section>
            {showShortcuts && <ShortcutModal onClose={() => setShowShortcuts(false)} />}
            <div className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl">
              {techList.map((t) => (
                <Tech key={t.name} name={t.name} Icon={t.Icon} color={t.color} />
              ))}
            </div>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 experience flex flex-col gap-15">
              {companies.map((comp) =>
                <ExperienceCard {...comp} theme={theme} />
              )}
            </motion.section>
              <span className="text-xs text-zinc-600">try alt+w 👀</span>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.slice(0, visibleCount).map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}

            </section>
            {visibleCount < projects.length && (
              <div className="flex justify-center mt-6 px-4">
                <button
                  onClick={handleShowMore}
                  className="tech z-10 flex items-center hover:shadow justify-center gap-2 px-5 py-2 text-sm font-semibold border border-zinc-700 rounded-xl cursor-pointer"
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
                <h2 className="text-4xl text-zinc-400 mb-6 font-bold z-10">Reviews</h2>
                <div className="z-10">
                  {reviews.map((item) => (
                    <Review key={item.id} {...item} />
                  ))}
                </div>
              </section> */}

            <section className="z-10 flex flex-col gap-10 items-center justify-center py-10 rounded-2xl">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">Blogs</h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {blogs.map((blog, index) =>
                  <BlogCard key={index} {...blog} />
                )}
              </div>
            </section>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 flex flex-col gap-10 items-center justify-center md:py-10 rounded-2xl">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">Leetcode Grind</h2>
              <LeetCodeStats username="kush_34" />
            </motion.section>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full z-10 flex flex-col gap-10 items-center justify-center md:py-10 rounded-2xl">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">Github Activity</h2>
              <div className="overflow-x-hidden">
                <GitHubCalendar
                  key={theme}
                  username="kush34"
                  blockSize={blockSize}
                  blockMargin={blockMargin}
                  colorScheme={theme}
                  fontSize={fontSize}
                />
              </div>
            </motion.section>
            <section className="z-10 px-4 mb-10 h-[10vh] text-center">
              <span className="text-zinc-500 text-center">Made with love by kush</span>
            </section>
            {customCurosr && <PikachuCursor />}
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;
