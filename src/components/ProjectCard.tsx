import { motion, useAnimation } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { div } from 'framer-motion/client';
import { GoArrowUpRight } from 'react-icons/go';
import { project } from "@/types";

const ProjectCard = (project: project) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/projectPage/${project.id}`)
  }
  return (
    <motion.div initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 0.8, y: 20, padding: "15px", borderRadius: "1%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='tech flex flex-col gap-6'
      whileHover={{ opacity: 1, scale: 1.005 }}
    >
      <div className=''>
        <img src={project.image} className='rounded' alt={project.altImage} />
      </div>
      <div className='flex flex-col'>
        <span className='mx-5 text-lg md:text-2xl font-medium'>{project.title}</span>
        <span className='text-secondary'>{project.description}</span>
      </div>
      <div className='flex justify-between mt-7 text-xl'>
        {project.liveLink && <a rel="noopener noreferrer"
          aria-label={`View live project: ${project.title || 'Project'}`} className='flex gap-2 items-center' target={'_blank'} href={`${project.liveLink}`}><GoArrowUpRight /></a>}
        {project.gitlink && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`View GitHub repository for ${project.title || 'Project'}`} target={'_blank'} href={`${project.gitlink}`}><FaGithub /></a>}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
