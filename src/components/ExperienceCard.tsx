import { company } from '@/types'
import { GoArrowUpRight } from 'react-icons/go'

const ExperienceCard = ({ name,position,time,points,link,imageLink,altImage }: company) => {
    return (
        <div className='z-10 flex flex-col gap-5 text-white'>
            <div className='flex justify-start items-center gap-10'>
                <span className='bg-zinc-100 rounded'>
                    <img src={imageLink} alt={altImage} className='p-5 w-10 h-15 rounded' />
                </span>
                <div className='flex flex-col'>
                    <span className='text-2xl font-medium'>{name} </span>
                    <span className=''>{position} </span>
                </div>
                <div className='flex flex-col items-center'>
                    {link && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`Company site link for ${name || 'Company'}`} target={'_blank'} href={`${link}`}><GoArrowUpRight size={24} /></a>}
                    <span className='text-sm font-light text-zinc-500'>{time}</span>

                </div>

            </div>
            <div className='grid grid-cols-1 gap-5 text-zinc-500 max-w-2xl'>
                {points.map((point, idx) =>
                    <span key={idx}>{point}</span>
                )}
            </div>
        </div>
    )
}

export default ExperienceCard