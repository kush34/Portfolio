import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { BiLogoMongodb } from "react-icons/bi";
import { SiTailwindcss, SiWebrtc } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { HiOutlineDownload } from "react-icons/hi";


const techList = [
  { name: "React", Icon: FaReact },
  { name: "Nodejs", Icon: FaNodeJs },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "MongoDB", Icon: BiLogoMongodb },
  { name: "Firebase", Icon: IoLogoFirebase },
  { name: "WebRTC", Icon: SiWebrtc },
];



const Profile = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const [isSticky, setIsSticky] = useState(false);
  const controls = useAnimation();
  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/kush34", label: "GitHub" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/chatt-kush-a85490201/", label: "LinkedIn" },
    { icon: <FaTwitter />, link: "https://twitter.com", label: "Twitter" },
    { icon: <IoMail />, link: "mailto:chattkush34@gmail.com", label: "Email" },
    { icon: <IoMdMoon />, link: "", label: "Theme", onclick: toggleTheme },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: isSticky ? 1 : 0,
      y: isSticky ? 0 : 20,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [isSticky, controls]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 20 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row items-center justify-center gap-16 px-12 py-40 mt-[10vh] max-w-7xl mx-auto border-10 rounded-3xl min-h-[300px]"
      >
        <div className="hidden md:flex flex-col items-start gap-4 absolute -left-2 top-1/3">
          {socialLinks.map((s, i) => (
            i + 1 != socialLinks.length ?
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
                whileHover={{ scale: 1.2 }}
                title={s.label}
              >
                {s.icon}
              </motion.a>
              :
              <span
                className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
                onClick={s.onclick}
              >
                {s.icon}
              </span>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
          <img
            src={`${import.meta.env.VITE_PROFILE}`}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg transition-all duration-300 hover:ring-2 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.4)]"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Chatt Kush</h2>
            <p className="flex items-center justify-center md:justify-start gap-1 mt-1">
              <MdLocationOn /> Mumbai, India
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 max-w-md xl:max-w-2xl">
          <div>
            <p className="leading-relaxed">
              I'm <strong className="text-lg">Chatt Kush</strong>, a software engineer from Mumbai, India. Currently pursuing B.Tech CSE from
              Renaissance University. I love technology, nerdy stuff, and cricket. Always curious, I enjoy
              coding, learning, and building new things.
            </p>
          </div>

          <div>
            <motion.a
              href={`${import.meta.env.VITE_RESUME_LINK}`}
              target="_blank"
              className="tech flex items-center gap-2 w-1/3 hover:scale-101 duration-100 hover:shadow-2xl ease-in text-center justify-center rounded-xl h-8"
            >
              <HiOutlineDownload className="text-lg" />
              Resume
            </motion.a>
          </div>
        </div>
      </motion.section>

      <motion.div
        animate={controls}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl ${isSticky ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-3 sm:px-6 md:px-24 py-2 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-xl border shadow-lg">
          <img
            src={`${import.meta.env.VITE_PROFILE}`}
            alt="Profile Small"
            className="w-5 h-5 sm:w-10 sm:h-10 rounded-full object-cover ring-1 flex-shrink-0"
          />
          <span className="font-semibold text-sm sm:text-base truncate min-w-0">Chatt Kush</span>

          <div className="flex gap-1.5 sm:gap-3 md:gap-4 ml-auto sm:ml-6 py-5 flex-shrink-0">
            {socialLinks.map((s, i) => (
              i + 1 != socialLinks.length ?
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.01 }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
                :
                <span
                  className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all text-sm sm:text-base"
                  onClick={s.onclick}
                >
                  {s.icon}
                </span>
            ))}
          </div>
        </div>
      </motion.div >
    </>
  );
};

export default Profile;
