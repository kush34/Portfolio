import React, { useState } from "react";
import Profile from "./components/Profile";
import ProjectCard from "./components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";
import "./App.css"
import GitHubCalendar from "react-github-calendar";
import { motion, useAnimation } from "framer-motion";
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
      description: "It’s a beta-stage trading app that enables users to log in, manage funds, monitor market prices, and handle their trading activities—all in a simple, professional interface.",
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
  const [visibleCount, setVisibleCount] = useState(4);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

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

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-10">
              {data.slice(0, visibleCount).map((p) => (
                <ProjectCard key={p.id} {...p} />
              ))}

              {visibleCount < data.length && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleShowMore}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold border rounded-xl hover:bg-gray-100 transition"
                  >
                    Show more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </section>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut" }} className="sm:w-1/2 md:w-full z-10 flex flex-col gap-10 items-center justify-center py-10 rounded-2xl shadow-md">
              <h2 className="text-4xl text-zinc-400 mb-6 font-bold">GitHub Activity</h2>
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
