import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'

const ExperienceCard = ({ comp }) => {
    return (
        <div className='z-10 flex flex-col gap-5 text-white border-2 border-pink-800'>
            <div className='flex justify-start items-center gap-5'>
                <span className='bg-zinc-100 rounded'>
                    <img src={comp.imageLink} className='p-5 w-10 h-15 rounded' />
                </span>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium'>{comp.name} </span>
                    <span className='font-light text-zinc-500'>{comp.time}</span>
                </div>
                <div className='flex flex-col items-center'>
                    {comp.link && <a className='flex gap-2 items-center' target={'_blank'} href={`${comp.link}`}><GoArrowUpRight size={24}/></a>}

                </div>

            </div>
            <div className='grid grid-cols-1 gap-5 text-zinc-500 max-w-2xl'>
                {comp.points.map((point, idx) =>
                    <span key={idx}>{point}</span>
                )}
            </div>
        </div>
    )
}

export default ExperienceCard