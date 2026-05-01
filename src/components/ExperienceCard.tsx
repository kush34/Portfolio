import { company } from '@/types'
import { GoArrowUpRight } from 'react-icons/go'
import { TbPointFilled } from 'react-icons/tb';

type ExperienceCardProps = company & {
    theme: "light" | "dark";
};

const ExperienceCard = ({ name, position, time, points, link, imageLink, altImage, img_bg, theme, techs }: ExperienceCardProps) => {
    return (
        <div className='z-10 flex flex-col gap-5'>
            <div className='flex justify-between items-center gap-10'>
                <div className='flex items-center gap-10'>
                    <span className={`${theme == "light" ? "bg-neutral-100" : "bg-zinc-900"} border border-zinc-200 dark:border-zinc-700 rounded flex items-center justify-center`}>
                        <img src={imageLink} alt={altImage} className={`p-2 md:p-5 size-16 md:size-20 rounded object-contain ${theme == "dark" && img_bg}`} />
                    </span>
                    <div className='flex flex-col'>
                        <span className='text-md xl:text-xl font-medium'>{name}</span>
                        <span className='text-zinc-600 text-sm xl:text-xl'>{position}</span>
                    </div>
                </div>
                {techs && techs.length > 0 && (
                    <div className='flex flex-wrap gap-3'>
                        {techs.map(({ icon: Icon, label }, idx) => (
                            <span key={idx} className='group relative cursor-default text-zinc-500 hover:text-zinc-300 transition-colors'>
                                <Icon size={20} />
                                <span className='absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:block bg-zinc-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50'>
                                    {label}
                                </span>
                            </span>
                        ))}
                    </div>
                )}
                <div className='hidden md:flex flex-col items-center text-zinc-500'>
                    {link && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`Company site link for ${name || 'Company'}`} target='_blank' href={link}><GoArrowUpRight size={24} /></a>}
                    <span className='text-sm font-light'>{time}</span>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-3 text-zinc-500 max-w-3xl'>
                {points.map((point, idx) => (
                    <div key={idx} className='group relative flex items-start gap-2'>
                        <TbPointFilled className='mt-1 shrink-0 text-zinc-400' />
                        <span className='cursor-default'>{point}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ExperienceCard