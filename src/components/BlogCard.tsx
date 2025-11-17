import { blog } from '@/types'
import { GoArrowUpRight } from 'react-icons/go'

const BlogCard = ({ title, content, time, link }: blog) => {
    return (
        <div className='p-10 rounded-xl flex justify-between'>
            <div className='flex flex-col gap-2'>
                <span className='text-2xl font-medium'>{title.slice(0, 50) || "Blog Title"}...</span>
                <span className='text-zinc-400'>{content.slice(0, 50) || "Loading Content..."}...</span>
            </div>
            <div>
                {link && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`View Blog destination for ${title || 'Blog Title'}`} target={'_blank'} href={`${link}`}><GoArrowUpRight size={24} /></a>}
            </div>
        </div>
    )
}

export default BlogCard