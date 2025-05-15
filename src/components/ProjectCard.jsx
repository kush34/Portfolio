import React from 'react';
import { FaGithub } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ image, title, techstack, description, gitlink,liveLink }) => {
  const colors = {
    "React" : "bg-blue-500",
    "Nodejs":"bg-green-500",
    "Firebase":"bg-yellow-500",
    "TailwindCSS":"bg-sky-600" 
  }
  return (
    <div className="flex flex-col md:flex-row items-center text-zinc-300 bg-zinc-800 hover:bg-zinc-900 rounded-xl p-4 transition duration-300 ease-in-out shadow-md w-full">
      
      <div className="w-full md:w-1/3 mb-4 md:mb-0 md:mr-6">
        <img
          className="w-full h-48 md:h-56 object-cover rounded-xl"
          src={image || "https://placehold.co/800x400"}
          alt={title || "Project Image"}
        />
      </div>
      
      <div className="w-full md:w-2/3 flex flex-col justify-between space-y-4">
        
        {/* Title */}
        <h2 className="text-lg md:text-2xl font-semibold">
          {title || "Project Title"}
        </h2>
        
        <div className="techstack">
          <ul className="flex flex-wrap gap-2 text-sm text-zinc-400">
            {techstack?.length ? (
              techstack.map((item, idx) => (
                <li key={idx} className={`${colors[item] ? colors[item] :"bg-zinc-700"} font-medium text-white px-2 py-1 rounded`}>
                  {item}
                </li>
              ))
            ) : (
              <li>Tech stack info</li>
            )}
          </ul>
        </div>

        <p className="text-sm md:text-base text-zinc-300">
          {description || "Brief description of the project goes here. Keep it concise for smaller screens."}
        </p>
        
        <div className="flex gap-5 items-center justify-end">
          {gitlink && (
            <a
              href={gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-400 text-2xl transition"
            >
              <FaGithub />
            </a>
          )}
            {liveLink && (
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-400 text-xl transition"
            >
              <FaExternalLinkAlt />
            </a>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
