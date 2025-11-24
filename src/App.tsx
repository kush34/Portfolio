import { useState, useEffect } from "react";
import Profile from "./components/Profile";
import ProjectCard from "./components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";
import "./App.css"
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import ExperienceCard from "./components/ExperienceCard";
import BlogCard from "./components/BlogCard";
import { blog, company, project, review } from "./types";
import Review from "./components/Review";
import Tech from "./components/Technology";
import { FaDocker, FaNodeJs, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiPostgresql, SiRedis, SiSocketdotio, SiSupabase, SiTailwindcss, SiTypescript, SiWebrtc } from "react-icons/si";
import { BiGitBranch, BiLogoMongodb } from "react-icons/bi";
import { IoLogoFirebase } from "react-icons/io5";
const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );
  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  }

  const data: project[] = [
    {
      id: 1,
      title: "Suchale | Real Time Messaging App",
      techstack: ["React", "Nodejs", "TailwindCSS", "Socket.IO"],
      description:
        "Suchale is a real-time messaging app similar to WhatsApp, allowing users to chat instantly, share media, and stay connected through secure, low-latency communication. It supports one-on-one and group conversations with real-time updates powered by Socket.IO.",
      gitlink: "https://github.com/kush34/Suchale",
      image: `${import.meta.env.VITE_IMAGE1}`,
      liveLink: "https://suchale.vercel.app/",
      altImage: "project1-Chat Application Image"
    },
    {
      id: 2,
      title: "Dr.Writer | Online Document Editor",
      techstack: ["React", "Nodejs", "TailwindCSS", "Firebase", "Socket.IO"],
      description:
        "Dr.Writer is an online document editor that allows users to create, edit, and collaborate on documents in real-time. It provides a smooth and responsive editing experience. Users can access their documents from anywhere, making it a great tool for remote work and team collaboration.",
      image: `${import.meta.env.VITE_IMAGE2}`,
      gitlink: "https://github.com/kush34/Dr.Writer",
      liveLink: "https://dr-writer.vercel.app/",
      altImage: "project2-Document Editor web app"
    },
    {
      id: 3,
      title: "Meet | Video Call App",
      techstack: ["React", "Nodejs", "TailwindCSS", "WebRTC", "Socket.IO"],
      description:
        "Meet is a video calling app that lets users connect through high-quality video and audio. Users can create and join video calls making it ideal for remote meetings, online classes, and virtual gatherings.",
      gitlink: "https://github.com/kush34/video-p2p",
      image: `${import.meta.env.VITE_IMAGE3}`,
      liveLink: "https://video-p2p-one.vercel.app/",
      altImage: "project3-Video p2p web app"
    },
    {
      id: 4,
      title: "Falcon Trading | Paper Trading App",
      techstack: ["React Native", "Supabase", "TailwindCSS"],
      description: "It's a beta-stage trading app that enables users to log in, manage funds, monitor market prices, and handle their trading activities—all in a simple, professional interface.",
      image: `${import.meta.env.VITE_IMAGE4}`,
      altImage: "project4-Paper Trading mobile app"

    },
    {
      id: 5,
      title: "Ecom | Clothing Ecommerce  App",
      techstack: ["React", "Nodejs", "TailwindCSS", "FirebaseAuth"],
      description:
        "Ecom is a fully functional e-commerce web application that includes both frontend and backend stacks, designed to showcase and handle typical online store workflows.",
      image: `${import.meta.env.VITE_IMAGE5}`,
      gitlink: "https://github.com/kush34/ecom",
      liveLink: "https://ecom-eight-beta.vercel.app/",
      altImage: "project5-Clothing ecommerce web app"
    },
    {
      id: 6,
      title: "KhataChopdi | Finance Guidance App",
      techstack: ["React", "Nodejs", "TailwindCSS", "FirebaseAuth"],
      description:
        "KhataChopdi is a simple and efficient expense tracker designed to help users manage their finances with ease. It allows users to log income and expenses, categorize transactions, and view spending insights.",
      image: `${import.meta.env.VITE_IMAGE6}`,
      gitlink: "https://github.com/kush34/WiseMon",
      liveLink: "https://wise-mon.vercel.app/",
      altImage: "project5-Expense Tracker web app"
    }
  ];
  const company: company[] = [
    {
      name: "Ipex Logistics",
      position: "Software Intern",
      time: "Sept-2025 - 3 monthns",
      points: ["Built and deployed scalable full-stack features using NextJS, and PostgreSQL, improving application performance and usability.", "Delivered end-to-end functionality with comprehensive test coverage, ensuring reliability and reducing production issues.", "Enhanced developer productivity by refactoring code and optimizing the code review pipeline, cuttingreview time significantly."],
      link: "https://www.ipexlogistics.com/",
      imageLink: `${import.meta.env.VITE_COMP_IMG}`,
      altImage: "company-logo of company"
    }
  ]
  const blogs: blog[] = [
    {
      title: "How to be sane when developing complex application | Testing with Jest",
      content: "I was doing development on my project and after some time i did some code refactoring and it was simple so i pushed the code to production. The things about pushing code and not testing them is when you make such changes and push it you think you have done is right but some things break and are easy to notice manually.",
      time: "1 Nov 2025",
      link: "https://medium.com/@chattkush34/how-to-be-sane-when-developing-complex-application-testing-with-jest-8743ccdd2520",
    }
  ]
  const reviews: review[] = [
    {
      id: "1",
      name: "Adash Raguvanshi",
      content: "gave him a finance project & he met the expectations. The great part is, he carries knowledge about multiple industries which makes it easy to coordinate about projects."
    }
  ]
  const techList = [
    { name: "React", Icon: FaReact, color: "text-sky-500" },
    { name: "TypeScript", Icon: SiTypescript, color: "text-blue-400" },
    { name: "NextJS", Icon: SiNextdotjs, color: "text-zinc-400" },
    { name: "Nodejs", Icon: FaNodeJs, color: "text-green-400" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "text-sky-400" },
    { name: "MongoDB", Icon: BiLogoMongodb, color: "text-green-400" },
    { name: "Firebase", Icon: IoLogoFirebase, color: "text-yellow-400" },
    { name: "WebRTC", Icon: SiWebrtc, color: "text-red-400" },
    { name: "Supabase", Icon: SiSupabase, color: "text-green-400" },
    { name: "PostgresSQL", Icon: SiPostgresql, color: "text-[#6497c1]" },
    { name: "Docker", Icon: FaDocker, color: "text-[#0974be]" },
    { name: "Redis", Icon: SiRedis, color: "text-[#d93327]" },
    { name: "Git", Icon: BiGitBranch, color: "text-[#e84d31]" },
    { name: "Socket.IO", Icon: SiSocketdotio, color: "text-[#21af90]" },
  ];
  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const [blockSize, setBlockSize] = useState(10);
  const [blockMargin, setBlockMargin] = useState(5);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setBlockSize(1);
        setBlockMargin(0);
        setFontSize(5);
      } else if (w < 640) {
        setBlockSize(10);
        setBlockMargin(1);
        setFontSize(10);
      } else if (w < 1024) {
        setBlockSize(12);
        setBlockMargin(2);
      } else {
        setBlockSize(15);
        setBlockMargin(5);
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
    <div className="min-h-screen w-full relative dark">
      <div className="min-h-screen w-full relative ">
        <div
          className="absolute inset-0 z-0"
        // style={{
        //   background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        // }}
        />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <Analytics />

          <div className="w-full max-w-5xl mx-auto flex flex-col gap-24 py-24">
            <section className="px-4">
              <Profile toggleTheme={toggleTheme} />
            </section>

            <div className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl md:max-w-4xl">
              {techList.map((t) => (
                <Tech key={t.name} name={t.name} Icon={t.Icon} color={t.color} />
              ))}
            </div>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10 experience flex items-center">
              {company.map((comp) =>
                <ExperienceCard {...comp} />
              )}
            </motion.section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-6">
              {data.slice(0, visibleCount).map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
            </section>
            <section className="flex flex-col justify-center items-center gap-5 px-4 mb-6">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold z-10">Reviews</h2>
              <div className="z-10">
                {reviews.map((item) => (
                  <Review key={item.id} {...item} />
                ))}
              </div>
            </section>

            {visibleCount < data.length && (
              <div className="flex justify-center mt-6 px-4">
                <button
                  onClick={handleShowMore}
                  className="z-10 flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold border border-zinc-700 rounded-xl hover:bg-zinc-800 transition bg-transparent"
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
            <section className="z-10 flex flex-col gap-10 items-center justify-center py-10 rounded-2xl">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">Blogs</h2>
              {blogs.map((blog, index) =>
                <BlogCard key={index} {...blog} />
              )}
            </section>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="sm:w-1/4 md:w-full z-10 flex flex-col gap-10 items-center justify-center md:py-10 rounded-2xl">
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
            <section className="z-10 px-4 mb-10 h-[10vh]">
              <span className="text-zinc-500 text-center">Made with love by kush</span>
            </section>
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;
