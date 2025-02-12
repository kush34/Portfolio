import React from 'react'
import { MdArrowOutward } from "react-icons/md";
const ProjectCard = ({props}) => {
  const handleClick = (link)=>{
    window.location.href = `${props?.gitlink}`;

  }
  return (
    <div className='h-1/3 sm:flex items-center text-zinc-300 rounded-xl hover:text-white hover:bg-zinc-800 hover:scale-99 duration-120 ease-in'>
      <div className="image w-1/3 overflow-hidden h-3/4 rounded-xl p-5">
        <img className='p-5' src={props?.image || "https://placehold.co/400x400"} alt="" />
      </div>
      <div className=' w-2/3'>
        <div className="title text-xl md:text-2xl font-semibold mx-5 my-2">
            {props?.title || "TitleProject"}
        </div>
        <div className="teachstack mx-5">
            <ul className='flex gap-3'>
                {props?.techstack.map((item)=>{
                    return(
                        <div>
                            {item}
                        </div>
                    )
                }) || "techstack"}
            </ul>
        </div>
        <div className="project-desc mx-5 my-2">
            {props?.description || "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto iure modi fugit minus dolor cumque odio perferendis culpa eligendi laboriosam, ex esse, libero labore! Quo, doloribus nobis. Molestias possimus similique vitae atque nam. Voluptates."}
        </div>
        <div onClick={()=>handleClick(props?.gitlink)} className="hover:text-zinc-400 hover:scale-101 duration-120 ease-in flex text-2xl justify-end mx-5 my-2 project-link">
          <MdArrowOutward />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
