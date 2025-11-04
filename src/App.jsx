import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import ProjectCard from "./components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";
import "./App.css"
import GitHubCalendar from "react-github-calendar";
import { motion, useAnimation } from "framer-motion";
import ExperienceCard from "./components/ExperienceCard";
const App = () => {
  const data = [
    {
      id: 1,
      title: "Suchale | Real Time Messaging App",
      techstack: ["React", "Nodejs", "TailwindCSS", "Socket.IO"],
      description:
        "Suchale is a real-time messaging app similar to WhatsApp, allowing users to chat instantly, share media, and stay connected through secure, low-latency communication. It supports one-on-one and group conversations with real-time updates powered by Socket.IO.",
      gitlink: "https://github.com/kush34/Suchale",
      image: `${import.meta.env.VITE_IMAGE1}`,
      liveLink: "https://suchale.vercel.app/",
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
    },
    {
      id: 4,
      title: "Falcon Trading | Paper Trading App",
      techstack: ["React Native", "Supabase", "TailwindCSS"],
      description: "It's a beta-stage trading app that enables users to log in, manage funds, monitor market prices, and handle their trading activities—all in a simple, professional interface.",
      image: `${import.meta.env.VITE_IMAGE4}`,

    },
    {
      id: 5,
      title: "KhataChopdi | Finance Guidance App",
      techstack: ["React", "Nodejs", "TailwindCSS", "FirebaseAuth"],
      description:
        "KhataChopdi is a simple and efficient expense tracker designed to help users manage their finances with ease. It allows users to log income and expenses, categorize transactions, and view spending insights.",
      image: `${import.meta.env.VITE_IMAGE5}`,
      gitlink: "https://github.com/kush34/WiseMon",
      liveLink: "https://wise-mon.vercel.app/",
    }
  ];
  const company = [
    {
      name: "Ipex Logistics",
      time: "Sept-2025 - 3 monthns",
      points: ["Built and deployed scalable full-stack features using NextJS, and PostgreSQL, improving application performance and usability.", "Delivered end-to-end functionality with comprehensive test coverage, ensuring reliability and reducing production issues.", "Enhanced developer productivity by refactoring code and optimizing the code review pipeline, cuttingreview time significantly."],
      link: "https://www.ipexlogistics.com/",
      imageLink: "https://www.ipexlogistics.com/images/logo.png"
    }
  ]
  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Responsive sizing for GitHubCalendar blocks
  const [blockSize, setBlockSize] = useState(15);
  const [blockMargin, setBlockMargin] = useState(5);

  useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      // small phones
      if (w < 480) {
        setBlockSize(8);
        setBlockMargin(3);
      } else if (w < 640) {
        // small screens
        setBlockSize(10);
        setBlockMargin(4);
      } else if (w < 1024) {
        // tablets / small desktops
        setBlockSize(12);
        setBlockMargin(4);
      } else {
        // large screens
        setBlockSize(15);
        setBlockMargin(5);
      }
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-[#0a0a0a]">
      <div className="min-h-screen w-full relative bg-black">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
          }}
        />
        <div className="flex flex-col items-center justify-center text-white min-h-screen px-4">
          <Analytics />

          <div className="w-full max-w-5xl mx-auto flex flex-col gap-16 py-16">
            <section className="px-4">
              <Profile />
            </section>

            <section className="z-10">
              {company.map((comp) =>
                <ExperienceCard comp={comp}/>
              )}
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-6">
              {data.slice(0, visibleCount).map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}
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

            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }} className="sm:w-1/4 md:w-full z-10 flex flex-col gap-10 items-center justify-center py-10 rounded-2xl shadow-md">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">Github Activity</h2>
              <div className="overflow-x-auto">
                <GitHubCalendar
                  username="kush34"
                  blockSize={15}
                  blockMargin={5}
                  colorScheme="dark"
                  fontSize={14}
                />
              </div>
            </motion.section>
            <section className="z-10 grid grid-cols-4 gap-8 px-4 mb-10 h-[10vh]">
              <span className="text-zinc-500 text-center">Made with love by kush</span>
            </section>
          </div>
        </div>
      </div>
    </div>


  );
};

export default App;
