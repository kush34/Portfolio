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
  return (
    <div className="left  rounded-xl h-[70vh] hover:bg-zinc-800 hover:scale-99 ease-in duration-120">
    <div className="image p-5 flex justify-center">
      <img className='rounded-full w-40 h-40' src="https://media.licdn.com/dms/image/v2/D4D03AQGTbxEpVGTmlg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723552628755?e=1744848000&v=beta&t=evBPIbe9c6OURxLTP8-8BSPjnDWaNr6CPNcaXvlaMpo" alt="" />
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
      <div className="teachstack flex flex-col items-center gap-5 m-5">
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
      <div className="links flex justify-around mt-5 w-1/3">
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
    </div>
  </div>
  )
}

export default Profile
