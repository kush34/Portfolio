import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { BiLogoMongodb } from "react-icons/bi";
import { SiTailwindcss } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiWebrtc } from "react-icons/si";
import { IoMail } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-zinc-900">
      <div className="profile w-full mt-10  flex justify-center">
        <img src="Profile.jpeg" className="rounded-full w-30 h-30" alt="" />
      </div>
      <div className="title text-center m-5 ">
        <div className="salutation">👋 Namaste, I am</div>
        <div className="name text-xl font-bold ">Chatt Kush</div>
        <div className="about text-left mt-5 text-sm">
          I'm Chatt Kush, a software engineer from Mumbai, India. I love
          technology, nerdy stuff, and cricket. Always curious, I enjoy coding,
          learning, and building new things.
        </div>
      </div>
      <div className="teachstack flex flex-col items-center gap-5 md:m-5">
        <div className="techtitle text-lg">Tech Stack</div>
        <div className="flex text-lg md:text-xl gap-5 md:gap-5">
          <div title="React - Frontend Library" className="hover:text-sky-600 hover:scale-125 ease-in duration-120">
            <FaReact />
          </div>
          <div title="MongoDB Database-NoSql" className="hover:text-green-800 hover:scale-125 ease-in duration-120">
            <BiLogoMongodb />
          </div>
          <div title="TailwindCSS Framework" className="hover:text-sky-600 hover:scale-125 ease-in duration-120">
            <SiTailwindcss />
          </div>
          <div title="NodeJS" className="hover:text-green-600 hover:scale-125 ease-in duration-120">
            <FaNodeJs />
          </div>
          <div title="Firebase Auth" className="hover:text-yellow-300 hover:scale-125 ease-in duration-120">
            <IoLogoFirebase />
          </div>
          <div title="WebRTC" className="hover:text-red-500 hover:scale-125 ease-in duration-120">
            <SiWebrtc />
          </div>
        </div>
      </div>
      <div className="links flex justify-around gap-5 m-5 w-1/3">
        {/* <div className="text-xl cursor-pointer hover:text-black hover:scale-125 ease-in duration-120">
          <a
            title="Twitter Profile"
            href={`https://x.com/KushChatt`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareXTwitter />
          </a>
        </div> */}
        <div title="Github Profile" className="hover:text-black hover:scale-125 ease-in duration-120 text-xl cursor-pointer">
          <a
            href={`https://github.com/kush34`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
        <div title="LinkedIn Profile" className="hover:text-sky-500 hover:scale-125 ease-in duration-120 text-xl cursor-pointer">
          <a
            href={`https://www.linkedin.com/in/chatt-kush-a85490201/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
        <div title="Mail address" className="hover:text-red-400 hover:scale-125 ease-in duration-120 text-xl cursor-pointer">
          <a
            href={`mailto:chattkush34@gmail.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoMail />
          </a>
        </div>
      </div>
      <div>
        <a
          href="/Chattkush.pdf"
          download="Chattkush.pdf"
          title="Download Resume"
          rel="noopener noreferrer"
        >
          <button className="bg-white px-5 py-2 text-black rounded md:mt-5 hover:bg-transparent border ease-in duration-120  hover:text-white">
            Resume
          </button>
        </a>
      </div>
    </div>
  );
};

export default Profile;
