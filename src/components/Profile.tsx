"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoCheckmark, IoMail } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { MdKeyboardCommandKey, MdLocationOn } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineDownload } from "react-icons/hi";

const EMAIL = "chattkush34@gmail.com";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={copied ? { scale: [1, 1.25, 1] } : {}}
      onClick={copy}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground hover:shadow-md transition-colors"
      title={copied ? "Copied!" : "Copy email"}
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      {copied ? <IoCheckmark /> : <IoMail />}
    </motion.button>
  );
};

const Profile = ({ toggleTheme, toggleModel }: { toggleTheme: () => void, toggleModel: () => void }) => {
  const [isSticky, setIsSticky] = useState(false);
  const controls = useAnimation();
  // 3D tilt on the profile photo
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 260, damping: 20 });
  const rotateY = useSpring(tiltY, { stiffness: 260, damping: 20 });
  const tiltTransform = useMotionTemplate`perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.set(-((e.clientY - r.top) / r.height - 0.5) * 24);
    tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 24);
  };
  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };
  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/kush34", label: "GitHub" },
    { icon: <SiLeetcode />, link: "https://leetcode.com/kush_34", label: "Leetcode Profile" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/chatt-kush-a85490201/", label: "LinkedIn" },
    { icon: <FaTwitter />, link: "https://x.com/KushChatt", label: "Twitter" },
    { icon: <IoMail />, link: "mailto:chattkush34@gmail.com", label: "Email" },
  ];
  const actions = [
    { icon: <MdKeyboardCommandKey />, link: "", label: "Theme", onclick: toggleModel },
    { icon: <IoMdMoon />, link: "", label: "Theme", onclick: toggleTheme }
  ]
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
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col md:flex-row items-center md:items-start gap-16 px-4 sm:px-6 md:px-0 py-10 w-full rounded-3xl min-h-[300px]"
      >
        <div className="flex flex-col items-center justify-center md:items-start gap-4 flex-shrink-0">
          <div className="relative w-54 h-54 sm:w-28 sm:h-28">
            {/* 3D tilt photo with shine + penguin easter egg */}
            <motion.div
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
              initial="rest"
              whileHover="hover"
              style={{ transform: tiltTransform }}
              className="relative w-full h-full"
            >
              {/* Penguin */}
              <motion.img
                src="./penguin.png"
                variants={{
                  rest: { rotate: 20, y: 0, scale: 1 },
                  hover: { rotate: 4, y: -16, scale: 1.45 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="absolute w-8 h-8 z-10 -bottom-3 right-0"
                alt="penguin"
              />

              {/* Profile */}
              <img
                src={process.env.NEXT_PUBLIC_PROFILE}
                alt="profile"
                className="w-full h-full rounded object-cover shadow-lg"
              />

              {/* shine sweep */}
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 0.35 } }}
                transition={{ duration: 0.4 }}
                className="pointer-events-none absolute inset-0 rounded bg-gradient-to-tr from-transparent via-white to-transparent mix-blend-overlay"
              />
            </motion.div>
          </div>
          <div className="text-center md:text-left flex flex-col items-center">
            <h2 className="text-2xl font-bold">Chatt Kush</h2>
            <p className="flex items-center justify-center md:justify-start gap-1 mt-1">
              <MdLocationOn /> Mumbai, India
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 max-w-full xl:max-w-2xl md:pr-24">
          <div>
            <p className="leading-relaxed">
              I&apos;m <strong className="text-lg">Chatt Kush</strong>, a software engineer from Mumbai, India. Currently pursuing B.Tech CSE from
              Renaissance University. I love technology, nerdy stuff, and cricket. Always curious, I enjoy
              coding, learning, and building new things.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex gap-2">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border hover:shadow-md transition-colors"
                  whileHover={{ scale: 1.1 }}
                  title={s.label}
                >
                  {s.icon}
                </motion.a>
              )).filter((_, i) => socialLinks[i].label !== "Email")}
              <CopyEmailButton />
            </div>
            <motion.a
              href={`${process.env.NEXT_PUBLIC_RESUME_LINK}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tech flex items-center justify-center gap-2 duration-100 ease-in rounded-xl h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <HiOutlineDownload className="text-lg shrink-0" />
              <span>Resume</span>
            </motion.a>
          </div>
        </div>
        <div className="hidden md:flex flex-col items-start gap-4 absolute right-6 top-1/8">
          {actions.map((s, i) => (
            <span
              key={i}
              className="flex items-center justify-center w-10 h-10 rounded-full shadow-md hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all"
              onClick={s.onclick}
            >
              {s.icon}
            </span>
          ))}
        </div>
      </motion.section>
      <motion.div
        animate={controls}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-2xl ${isSticky ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8 px-3 sm:px-6 md:px-24 py-1 sm:py-3 rounded-xl sm:rounded-2xl backdrop-blur-xl shadow-lg">
          <img
            src={`${process.env.NEXT_PUBLIC_PROFILE}`}
            alt="Profile Small"
            className="w-5 h-5 sm:w-10 sm:h-10 rounded-full object-cover ring-1 flex-shrink-0"
          />
          <span className="font-semibold text-sm sm:text-base truncate min-w-0">Kush</span>

          <div className="navbarFloat flex gap-1.5 sm:gap-3 md:gap-4 ml-auto sm:ml-6 flex-shrink-0">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-full hover:shadow-[0_0_15px_rgba(255,255,255,0.25)] transition-all text-sm sm:text-base"
                whileHover={{ scale: 1.01 }}
                title={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div >
    </>
  );
};

export default Profile;
