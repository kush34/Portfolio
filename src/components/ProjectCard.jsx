import React from 'react';
import { motion, useAnimation } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';
import { GoArrowUpRight } from 'react-icons/go';

const ProjectCard = ({ ...proj }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/projectPage/${id}`)
  }
  const colors = {
    "React": "bg-blue-500",
    "Nodejs": "bg-green-500",
    "Firebase": "bg-yellow-500",
    "TailwindCSS": "bg-sky-600"
  }
  return (
    <motion.div initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 0.8, y: 20,padding:"15px",borderRadius:"2%"}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='flex flex-col gap-6'
      whileHover={{opacity:1,scale:1.005,border:"1px solid #1a1a1a"}}
      >
      <div className=''>
        <img src={proj.image} className='rounded' alt="" />
      </div>
      <div className='flex flex-col'>
        <span className='mx-5 text-2xl font-medium'>{proj.title}</span>
        <span className='text-zinc-500'>{proj.description}</span>
      </div>
      <div className='flex justify-between mt-7 text-xl'>
        <a className='flex gap-2 items-center' target={'_blank'} href={`${proj.liveLink}`}><GoArrowUpRight /></a>
        <a className='flex gap-2 items-center' target={'_blank'} href={`${proj.gitlink}`}><FaGithub />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
