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
  <div className='flex flex-col items-center h-screen bg-zinc-900'>
    <div className="profile w-full mt-10  flex justify-center">
      <img src="Profile.jpeg" className='rounded-full w-30 h-30' alt="" />
    </div>
    <div className="title text-center m-5 ">
      <div className="salutation">
      👋 Namaste, I am
      </div>
      <div className="name text-xl font-bold ">
        Chatt Kush
      </div>
      <div className="about text-left mt-5 text-sm">
      I'm Chatt Kush, a software engineer from Mumbai, India. I love technology, nerdy stuff, and cricket. Always curious, I enjoy coding, learning, and building new things.
      </div>
    </div>
    <div className="teachstack flex flex-col items-center gap-5 md:m-5">
       <div className="techtitle text-lg">
         Tech Stack
       </div>
       <div className='flex text-lg md:text-xl gap-5 md:gap-5'>
       <FaReact />
       <BiLogoMongodb />
       <SiTailwindcss/>
       <FaNodeJs />
       <IoLogoFirebase />
       <SiWebrtc />
       </div>
    </div>
    <div className="links flex justify-around gap-5 m-5 w-1/3">
        <div onClick={handleTwitter} className='text-xl cursor-pointer'>
          <FaSquareXTwitter />
        </div>
        <div onClick={handleGithub} className='text-xl cursor-pointer'>
          <FaGithub/>
        </div>
        <div onClick={handleLinkedIn} className='text-xl cursor-pointer'>
          <FaLinkedin />
        </div>
    </div>
    <div>
        <button onClick={handleConnect} className='bg-white px-5 py-2 text-black rounded md:mt-5 hover:bg-transparent border ease-in duration-120  hover:text-white'>Let's Connect</button>
      </div>
    </div>  
  )
}

export default Profile
