import { company } from '@/types'
import { useState } from 'react';
import { GoArrowUpRight } from 'react-icons/go'

type ExperienceCardProps = company & {
  theme: "light" | "dark";
};

const ExperienceCard = ({ name, position, time, points, link, imageLink, altImage, img_bg,theme }:ExperienceCardProps) => {
    return (
        <div className='z-10 flex flex-col gap-5 '>
            <div className='flex justify-between items-center gap-10'>
                <div className='flex items-center gap-10'>
                    <span className={`${theme == "light" ? "bg-neutral-100" : "bg-zinc-900"}  rounded flex items-center`}>
                        <img src={imageLink} alt={altImage} className={`p-2 md:p-5 size-15 md:size-20 rounded ${theme == "dark" && img_bg}`} />
                    </span>
                    <div className='flex flex-col'>
                        <span className='text-md xl:text-xl font-medium'>{name} </span>
                        <span className='text-zinc-600 text-sm xl:text-xl'>{position} </span>
                    </div>
                </div>
                <div className='hidden md:flex flex-col items-center text-zinc-500'>
                    {link && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`Company site link for ${name || 'Company'}`} target={'_blank'} href={`${link}`}><GoArrowUpRight size={24} /></a>}
                    <span className='text-sm font-light '>{time}</span>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-5 text-zinc-500 max-w-3xl'>
                {points.map((point, idx) =>
                    <span key={idx}> - {point}</span>
                )}
            </div>
        </div>
    )
}

export default ExperienceCard