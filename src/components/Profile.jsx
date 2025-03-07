import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { BiLogoMongodb } from "react-icons/bi";
import { SiTailwindcss } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiWebrtc } from "react-icons/si";

const Profile = () => {
  const handleTwitter = ()=>{
    window.location.href = 'https://x.com/KushChatt';
  }
  const handleGithub = ()=>{
    window.location.href = 'https://github.com/kush34';
  }
  const handleLinkedIn = ()=>{
    window.location.href = 'https://www.linkedin.com/in/chatt-kush-a85490201/';
  }
  const handleConnect = ()=>{
    window.location.href = "mailto:chattkush34@gmail.com";
  }
  return (
    <div className="left  rounded-xl h-[80vh] hover:bg-zinc-800 hover:scale-99 ease-in duration-120">
    <div className="image p-5 flex justify-center">
      <img className='rounded-full w-40 h-40' src="Profile.jpeg" alt="" />
    </div>
    <div className="title flex flex-col items-center">
      <div className="salutation md:text-xl">
      👋Namaste, I am
      </div>
      <div className='text-4xl font-bold'>
        Chatt Kush
      </div>
      <div className="about-title text-zinc-400 mt-10 text-xl font-semibold">
        About Me
      </div>
      <div className="w-1/2 md:w-3/4 about-desc m-5">
        I'm Chatt Kush, a software engineer from Mumbai, India. I love technology, nerdy stuff, and cricket. Always curious, I enjoy coding, learning, and building new things.
      </div>
      <div className="teachstack flex flex-col items-center gap-5 md:m-5">
        <div className="techtitle text-2xl">
          TechStack
        </div>
        <div className='flex text-4xl gap-5'>
        <FaReact />
        <BiLogoMongodb />
        <SiTailwindcss/>
        <FaNodeJs />
        <IoLogoFirebase />
        <SiWebrtc />
        </div>
      </div>
      <div className="links flex justify-around m-5 w-1/3">
        <div onClick={handleTwitter} className='text-2xl cursor-pointer'>
          <FaSquareXTwitter />
        </div>
        <div onClick={handleGithub} className='text-2xl cursor-pointer'>
          <FaGithub/>
        </div>
        <div onClick={handleLinkedIn} className='text-2xl cursor-pointer'>
          <FaLinkedin />
        </div>
      </div>
      <div>
        <button onClick={handleConnect} className='bg-white px-5 py-2 text-black rounded mt-5 hover:bg-transparent border ease-in duration-120  hover:text-white'>Let's Connect</button>
      </div>
    </div>
  </div>
  )
}

export default Profile
