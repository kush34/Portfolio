import React from "react";
import Profile from "./components/Profile";
import ProjectCard from "./components/ProjectCard";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  const data = [
    {
      id: 1,
      title: "Dr.Writer | Online Document Editor",
      techstack: ["React", "Nodejs", "TailwindCSS", "Firebase", "Socket.IO"],
      description:
        "Dr.Writer is an online document editor that allows users to create, edit, and collaborate on documents in real-time. It provides a smooth and responsive editing experience. Users can access their documents from anywhere, making it a great tool for remote work and team collaboration.",
      image: "DrWriter.png",
      gitlink: "https://github.com/kush34/Dr.Writer",
      liveLink: "https://dr-writer.vercel.app/",
    },
    {
      id: 2,
      title: "Meet | Video Call App",
      techstack: ["React", "Nodejs", "TailwindCSS", "WebRTC", "Socket.IO"],
      description:
        "Meet is a video calling app that lets users connect through high-quality video and audio. It is built to provide a seamless communication experience. Users can create and join video calls making it ideal for remote meetings, online classes, and virtual gatherings. The app supports real-time messaging, screen sharing, and multiple participants, making collaboration easy.",
      gitlink: "https://github.com/kush34/video-p2p",
      image:"/Videop2p/home.png",
      liveLink: "https://video-p2p-one.vercel.app/",
    },
    {
      id: 3,
      title: "KhataChopdi | Finance Guidance App",
      techstack: ["React", "Nodejs", "TailwindCSS", "FirebaseAuth"],
      description:
        "KhataChopdi is a simple and efficient expense tracker designed to help users manage their finances with ease. It allows users to log income and expenses, categorize transactions, and view spending insights. The app features a clean and intuitive interface, making it easy to track financial activities. Users can manually add, edit, and delete transactions while keeping a clear record of their financial history. KhataChopdi is perfect for individuals and small businesses looking to stay organized and make smarter financial decisions.",
      image: "/WiseMon/Home.png",
      gitlink: "https://github.com/kush34/WiseMon",
      liveLink: "https://wise-mon.vercel.app/",
    },
  ];
  return (
    <div className="max-w-screen-2xl flex flex-col justify-center items-center xl:flex-row text-white  w-full xl:h-screen">
      <div className="w-full xl:w-1/4 h-screen">
        <Profile />
      </div>
      <div className="Projects flex flex-col gap-5 w-full md:w-3/4 p-5 md:h-screen overflow-y-auto no-scrollbar">
        {data.map((project) => {
          return <ProjectCard {...project} />;
        })}
      </div>
    </div>
  );
};

export default App;
