import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { BiLogoMongodb } from "react-icons/bi";
import { SiTailwindcss, SiWebrtc } from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";

const socialLinks = [
  { icon: <FaGithub />, link: "https://github.com/kush34", label: "GitHub" },
  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/chatt-kush-a85490201/", label: "LinkedIn" },
  { icon: <FaTwitter />, link: "https://twitter.com", label: "Twitter" },
  { icon: <IoMail />, link: "mailto:chattkush34@gmail.com", label: "Email" },
];

const Profile = () => {
  const [isSticky, setIsSticky] = useState(false);
  const controls = useAnimation();

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
        className="relative flex flex-col md:flex-row items-center justify-center gap-16 px-12 py-40 mt-[10vh] max-w-7xl mx-auto  rounded-3xl text-white min-h-[300px]"
      >
        <div className="hidden md:flex flex-col items-center gap-4 absolute -left-16 top-1/3">
          {socialLinks.map((s, i) => (
            <motion.a
              key={i}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:border-white/40 text-zinc-300 hover:text-white shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
              whileHover={{ scale: 1.2 }}
              title={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
          <img
            src={`${import.meta.env.VITE_PROFILE}`}
            alt="Profile"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover shadow-lg transition-all duration-300 hover:ring-2 hover:ring-white/40 hover:shadow-[0_0_20px_5px_rgba(255,255,255,0.4)]"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Chatt Kush</h2>
            <p className="text-zinc-400 flex items-center justify-center md:justify-start gap-1 mt-1">
              <MdLocationOn className="text-zinc-500" /> Mumbai, India
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 max-w-xl">
          <div>
            <p className="text-zinc-300 leading-relaxed">
              I'm Chatt Kush, a software engineer from Mumbai, India. Currently pursuing B.Tech CSE from
              Renaissance University. I love technology, nerdy stuff, and cricket. Always curious, I enjoy
              coding, learning, and building new things.
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-4 sm:gap-6 text-2xl sm:text-3xl">
              <span className="border-2 border-dashed hover:text-sky-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <FaReact className="text-lg" />
                React
              </span>
              <span className="border-2 border-dashed hover:text-green-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <FaNodeJs className="text-lg" />
                Nodejs
              </span>
              <span className="border-2 border-dashed hover:text-sky-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <SiTailwindcss className="text-lg" />
                Tailwind
              </span>
              <span className="border-2 border-dashed hover:text-green-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <BiLogoMongodb className="text-lg" />
                MongoDB
              </span>
              <span className="border-2 border-dashed hover:text-yellow-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <IoLogoFirebase className="text-lg" />
                Firebase
              </span>
              <span className="border-2 border-dashed hover:text-red-500 transition-transform cursor-pointer flex items-center gap-2 text-sm">
                <SiWebrtc className="text-lg" />
                WebRTC
              </span>
            </div>
          </div>

          <div>
            <motion.a
              href={`${import.meta.env.VITE_RESUME_LINK}`}
              target="_blank"
              className="flex items-center gap-2 w-1/3 bg-zinc-500 hover:scale-101 duration-100 hover:shadow-2xl ease-in text-center justify-center rounded h-8"
            >
              <HiOutlineDownload className="text-lg" />
              Resume
            </motion.a>
          </div>

        </div>
      </motion.section>

      <motion.div
        animate={controls}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl ${isSticky ? "pointer-events-auto" : "pointer-events-none"
          }`}
      >
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-3 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg">
          <img
            src="Profile.jpeg"
            alt="Profile Small"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover ring-1 ring-white/20 flex-shrink-0"
          />
          <span className="font-semibold text-white text-sm sm:text-base truncate min-w-0">Chatt Kush</span>

          <div className="flex gap-1.5 sm:gap-3 md:gap-4 ml-auto sm:ml-6  flex-shrink-0">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all text-zinc-300 text-sm sm:text-base"
                whileHover={{ scale: 1.2 }}
                title={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
