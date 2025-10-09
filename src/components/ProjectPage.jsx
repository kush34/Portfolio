import React, { useEffect, useState } from 'react'
import { MdArrowOutward } from "react-icons/md";
import { FaGithub } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { useParams } from 'react-router-dom'

const ProjectPage = () => {
  const [project,setProject] = useState();
  const [img,setImg] = useState(0);

  const data = [
    {
      "id":1,"images":['/Dr.Writer/home.png','/Dr.Writer/login.png','/Dr.Writer/addUser.png','/Dr.Writer/Editor.png'],"title":"Dr.Writer | Online Document Editor","techstack":["React","Nodejs","TailwindCSS","Firebase","Socket.IO"],"description":"Dr.Writer is an online document editor that allows users to create, edit, and collaborate on documents in real-time. It provides a smooth and responsive editing experience. Users can access their documents from anywhere, making it a great tool for remote work and team collaboration.","image":"DrWriter.png","gitlink":"https://github.com/kush34/Dr.Writer","liveLink":"https://dr-writer.vercel.app/"
    },
    {"id":2,"images":['/Videop2p/home.png','/Videop2p/videoCall.png','/Videop2p/sharingScreen.png','/Videop2p/sharedScreen.png',],"title":"Meet | Video Call App","techstack":["React","Nodejs","TailwindCSS","WebRTC","Socket.IO"],"description":"Meet is a video calling app that lets users connect through high-quality video and audio. It is built to provide a seamless communication experience. Users can create and join video calls making it ideal for remote meetings, online classes, and virtual gatherings. The app supports real-time messaging, screen sharing, and multiple participants, making collaboration easy.","gitlink":"https://github.com/kush34/video-p2p","liveLink":"https://video-p2p-seven.vercel.app/"
    },
    {
      "id":3,"images":['/WiseMon/Home.png','/WiseMon/investment.png','/WiseMon/transaction.png','/WiseMon/addExpense.png','/WiseMon/Communities.png'],"title":"KhataChopdi | Finance Guidance App","techstack":["React","Nodejs","TailwindCSS","FirebaseAuth"],"description":"KhataChopdi is a simple and efficient expense tracker designed to help users manage their finances with ease. It allows users to log income and expenses, categorize transactions, and view spending insights. The app features a clean and intuitive interface, making it easy to track financial activities. Users can manually add, edit, and delete transactions while keeping a clear record of their financial history. KhataChopdi is perfect for individuals and small businesses looking to stay organized and make smarter financial decisions.","image":"khata.png","gitlink":"https://github.com/kush34/WiseMon","liveLink":"https://wise-mon.vercel.app/"
    }
  ]
  const colors = {
    "React" : "bg-blue-500",
    "Nodejs":"bg-green-500",
    "Firebase":"bg-yellow-500",
    "TailwindCSS":"bg-sky-600" 
  }
  const {id} = useParams();
  // console.log(id);
  useEffect(()=>{
    const proj = data.find((proj)=>proj.id === parseInt(id));
    setProject(proj);
    console.log(project);
  },[])
  useEffect(() => {
    if (!project || !project.images) return;
  
    const interval = setInterval(() => {
      setImg(prev => (prev + 1) % project.images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [project]);
  if (!project) {
    return <div className="text-white text-center mt-10">Loading or Project Not Found</div>;
  }  
  return (
    <div className='text-white w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10'>
      <div className='w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10 heading mt-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0'>
        <div className='text-center sm:text-left'>
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-medium">
            {project?.title}
          </h1>
        </div>
        <div className="flex gap-3 justify-center sm:justify-end items-center mt-3 sm:mt-0">
          {project?.gitlink && (
            <a
              href={project?.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-400 text-3xl transition"
            >
              <FaGithub />
            </a>
          )}
          {project?.liveLink && (
            <a
            href={project?.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-zinc-400 text-3xl transition"
            >
            <MdArrowOutward />
            </a>
          )}
        </div>
      </div>
      <div className="images shadow-xl hover:shadow-2xl ease-in duration-150 shadow-zinc-800 flex justify-center items-center w-full max-w-4xl h-60 sm:h-80 md:h-96 lg:h-120 bg-zinc-900 m-5 rounded-xl relative">
        <button className='absolute left-2 sm:left-4 cursor-pointer hover:scale-125 ease-in duration-150 p-2 bg-black bg-opacity-50 rounded-full' onClick={()=>setImg(prev => (prev - 1 + project.images.length) % project.images.length)}><FaAngleLeft size={24} className="sm:size-32" /></button>
        <img src={`${project?.images[img]}`} className='w-full h-full object-contain rounded-xl' alt="" />
        <button className='absolute right-2 sm:right-4 cursor-pointer hover:scale-125 ease-in duration-150 p-2 bg-black bg-opacity-50 rounded-full' onClick={()=>setImg(prev => (prev + 1) % project.images.length)}><FaAngleRight size={24} className="sm:size-32" /></button>
      </div>
      <div className="techstack mt-5 mx-5 w-full max-w-4xl">
          <ul className="flex flex-wrap gap-2 text-sm sm:text-base text-zinc-400 justify-center">
            {project?.techstack?.length ? (
              project?.techstack.map((item, idx) => (
                <li key={idx} className={`${colors[item] ? colors[item] :"bg-zinc-700"} font-medium text-white px-3 py-1 rounded`}>
                  {item}
                </li>
              ))
            ) : (
              <li>Tech stack info</li>
            )}
          </ul>
        </div>
      <div className="p-5 max-w-4xl w-full text-base md:text-lg xl:text-xl flex justify-center items-center description text-center sm:text-left">
        {project?.description}
      </div>
    </div>
  )
}

export default ProjectPage
