import { blog, company, project, review } from "@/types";
import { FaDocker, FaNodeJs, FaReact } from "react-icons/fa";
import { SiFastapi, SiNextdotjs, SiPostgresql, SiPrisma, SiRedis, SiSocketdotio, SiSupabase, SiTailwindcss, SiTypescript, SiVitest, SiWebrtc } from "react-icons/si";
import { BiGitBranch, BiLogoDjango, BiLogoMongodb } from "react-icons/bi";
import { DiDjango } from "react-icons/di";
import { IoLogoFirebase } from "react-icons/io5";
import { SiJest } from "react-icons/si";
import Tanstack from "@/components/icons/tanstack";

const projects: project[] = [
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
const companies: company[] = [
    {
        name: "AxentraOS",
        position: "Software Intern",
        time: "March-2026 - present",
        points: ["Built and deployed scalable full-stack features using NextJS, and PostgreSQL, improving application performance and usability.", "Delivered end-to-end functionality with comprehensive test coverage, ensuring reliability and reducing production issues.", "Enhanced developer productivity by refactoring code and optimizing the code review pipeline, cuttingreview time significantly."],
        link: "https://axentraos.com/",
        img_bg: "dark:invert dark:brightness-0",
        imageLink: `${import.meta.env.VITE_COMP2_IMG}`,
        altImage: "company-logo of company"
    },
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
        title: "My First Interview Experience",
        content: "My Interview experience at a firm in Mumbai",
        time: "04 March 2026",
        link: "/blog/Interview"
    },
    {
        title: "Making an App out of spite | GeoImg",
        content: "Making an app after getting frustated from Ads",
        time: "10 Feb 2026",
        link: "/blog/GeoImg",
    },
    {
        title: "How to be sane when developing complex application | Testing with Jest",
        content: "I was doing development on my project and after some time i did some code refactoring and it was simple so i pushed the code to production. The things about pushing code and not testing them is when you make such changes and push it you think you have done is right but some things break and are easy to notice manually.",
        time: "1 Nov 2025",
        link: "/blog/testing",
    },
    {
        title: "Suchale | chat application | MERN Stack + Redis",
        content: "Explaining Websocket and Chat App in detail",
        time: "1 Nov 2025",
        link: "/blog/Suchale",
    },
    {
        title: "FastAPI | Express to fastAPI Journey",
        content: "understanding fastapi from an express js pov",
        time: "18 March 2026",
        link: "/blog/fastapi",
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
    { name: "NextJS", Icon: SiNextdotjs, color: "text-zinc-400" },
    { name: "TypeScript", Icon: SiTypescript, color: "text-blue-400" },
    { name: "FastAPI", Icon: SiFastapi, color: "text-green-500" },
    { name: "Django", Icon: BiLogoDjango, color: "text-pink-500" },
    { name: "Nodejs", Icon: FaNodeJs, color: "text-green-400" },
    { name: "Prisma", Icon: SiPrisma, color: "text-zinc-500" },
    { name: "Tailwind", Icon: SiTailwindcss, color: "text-sky-400" },
    { name: "MongoDB", Icon: BiLogoMongodb, color: "text-green-400" },
    { name: "Firebase", Icon: IoLogoFirebase, color: "text-yellow-400" },
    { name: "WebRTC", Icon: SiWebrtc, color: "text-red-400" },
    { name: "Tanstack", Icon: Tanstack, color: "text-yellow-400" },
    { name: "Supabase", Icon: SiSupabase, color: "text-green-400" },
    { name: "PostgresSQL", Icon: SiPostgresql, color: "text-[#6497c1]" },
    { name: "Jest", Icon: SiJest, color: "text-red-500" },
    { name: "Vitest", Icon: SiVitest, color: "text-purple-500" },
    { name: "Docker", Icon: FaDocker, color: "text-[#0974be]" },
    { name: "Redis", Icon: SiRedis, color: "text-[#d93327]" },
    { name: "Git", Icon: BiGitBranch, color: "text-[#e84d31]" },
    { name: "Socket.IO", Icon: SiSocketdotio, color: "text-[#21af90]" },
];

export { projects, companies, blogs, reviews, techList }