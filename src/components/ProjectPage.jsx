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
    <div className='text-white w-full text-xl flex flex-col items-center justify-center'>
      <div className='px-10 heading w-full mt-5 flex justify-between items-center'>
        <div className=''>
          <h1 className="text-white sm:text-sm md:text-xl xl:text-2xl font-medium">
            {project?.title}
          </h1>
        </div>
        <div className="flex gap-3 justify-end">
          {project?.gitlink && (
            <a
              href={project?.gitlink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-zinc-400 text-2xl transition"
            >
              <FaGithub />
            </a>
          )}
          {project?.liveLink && (
            <a
            href={project?.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-zinc-400 text-2xl transition"
            >
            <MdArrowOutward />
            </a>
          )}
        </div>
      </div>
      <div className="images shadow-xl hover:shadow-2xl ease-in duration-150 shadow-zinc-800 flex justify-center items-center w-8/10 h-sm bg-zinc-900 m-5 rounded-xl">
        <button className='cursor-pointer hover:scale-125 ease-in duration-150' onClick={()=>setImg(prev => (prev - 1) % project.images.length)}><FaAngleLeft size={32} /></button>
        <img src={`${project?.images[img]}`} className='w-full h-full rounded-xl' alt="" />
        <button className='cursor-pointer hover:scale-125 ease-in duration-150' onClick={()=>setImg(prev => (prev + 1) % project.images.length)}><FaAngleRight size={32} /></button>
      </div>
      <div className="techstack mt-5 mx-5">
          <ul className="flex flex-wrap gap-2 text-sm text-zinc-400">
            {project?.techstack?.length ? (
              project?.techstack.map((item, idx) => (
                <li key={idx} className={`${colors[item] ? colors[item] :"bg-zinc-700"} font-medium text-white px-2 py-1 rounded`}>
                  {item}
                </li>
              ))
            ) : (
              <li>Tech stack info</li>
            )}
          </ul>
        </div>
      <div className="p-5 max-w-4xl sm:w-full text-sm md:text-lg xl:text-xl flex justify-center items-center description">
        {project?.description}
      </div>
    </div>
  )
}

export default ProjectPage
