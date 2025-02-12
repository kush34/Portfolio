import React from 'react'
import Profile from './components/Profile'
import ProjectCard from './components/ProjectCard'

const App = () => {
  const data = [
    {
      "title":"Dr.Writer | Online Document Editor","techstack":["React","Nodejs","TailwindCSS","Firebase","Socket.IO"],"description":"Dr.Writer is an online document editor that allows users to create, edit, and collaborate on documents in real-time. It provides a smooth and responsive editing experience. Users can access their documents from anywhere, making it a great tool for remote work and team collaboration.","image":"https://private-user-images.githubusercontent.com/86916998/399459294-f13b818a-5858-467e-a680-c822bf25f83e.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkzNzkyNzEsIm5iZiI6MTczOTM3ODk3MSwicGF0aCI6Ii84NjkxNjk5OC8zOTk0NTkyOTQtZjEzYjgxOGEtNTg1OC00NjdlLWE2ODAtYzgyMmJmMjVmODNlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEyVDE2NDkzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTllN2QxNGQxOWUzNWEyNjA4Y2JkNTQwZGE4MWQ4ZmFiNjM0YzVlMTVkMWUxMmI4NDMwODBkNDE3OGUwNmQyZDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.vF5SH40jwKtoDz3R458EZ72zmCvxQKgJkeEzeWMTY9c","gitlink":"https://github.com/kush34/Dr.Writer"
    },
    {"title":"Meet | Video Call App","techstack":["React","Nodejs","TailwindCSS","WebRTC","Socket.IO"],"description":"Meet is a video calling app that lets users connect through high-quality video and audio. It is built to provide a seamless communication experience. Users can create and join video calls making it ideal for remote meetings, online classes, and virtual gatherings. The app supports real-time messaging, screen sharing, and multiple participants, making collaboration easy.","gitlink":"https://github.com/kush34/video-p2p"
    },
    {
      "title":"KhataChopdi | Online Document Editor","techstack":["React","Nodejs","TailwindCSS","FirebaseAuth","Socket.IO"],"description":"KhataChopdi is a simple and efficient expense tracker designed to help users manage their finances with ease. It allows users to log income and expenses, categorize transactions, and view spending insights. The app features a clean and intuitive interface, making it easy to track financial activities. Users can manually add, edit, and delete transactions while keeping a clear record of their financial history. KhataChopdi is perfect for individuals and small businesses looking to stay organized and make smarter financial decisions.","image":"https://private-user-images.githubusercontent.com/86916998/390274499-962b6687-26f3-498a-a1f4-ba1b402bca41.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkzNzkzMzEsIm5iZiI6MTczOTM3OTAzMSwicGF0aCI6Ii84NjkxNjk5OC8zOTAyNzQ0OTktOTYyYjY2ODctMjZmMy00OThhLWExZjQtYmExYjQwMmJjYTQxLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEyVDE2NTAzMVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTk2NjRhY2UzNWJjNTAxZjEzNGJmM2EwMjk3YjMyMjdlMTQ0MTFhNzhlZjkyNWI2OTFlZTI2ZWMwMzE3MGRhYjUmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.pcO6CAOUlI4WGgfqUputxLrLaHqLRIDHkmmWGpffOio","gitlink":"https://github.com/kush34/WiseMon-expenseTracker"
    }
  ]
  return (
    <div className='flex flex-col md:flex-row justify-between text-white items-center bg-zinc-900 w-full h-screen'>
      <div className='w-full md:w-1/4 m-10'>
        <Profile/>
      </div>
      <div className="Projects flex flex-col w-full md:w-3/4 p-5 h-screen m-10">
        {data.map((project)=>{
          return(
            <ProjectCard props={project}/>
          )
        })}
      </div>
    </div>
  )
}

export default App
