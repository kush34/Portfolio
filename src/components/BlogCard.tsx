import { GoArrowUpRight } from 'react-icons/go'
import { blog } from '../types'

const BlogCard = ({ title, content, time, link }: blog) => {
    return (
        <div className='p-10 rounded-xl w-full flex justify-between shadow border border-gray-100'>
            <div className='flex flex-col gap-2'>
                <span className='text-2xl font-semibold'>{title.slice(0, 50) || "Blog Title"}...</span>
                <span className=''>{content.slice(0, 50) || "Loading Content..."}...</span>
            </div>
            <div>
                {link && <a className='flex gap-2 items-center' rel="noopener noreferrer" aria-label={`View Blog destination for ${title || 'Blog Title'}`}  href={`${link}`}><GoArrowUpRight size={24} /></a>}
            </div>
        </div>
    )
}

export default BlogCard