import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'

const BlogCard = ({...blog}) => {
    return (
        <div className='p-10 rounded-xl flex justify-between'>
            <div className='flex flex-col gap-2'>
                <span className='text-2xl font-medium'>{blog.title.slice(0,50) || "Blog Title"}...</span>
                <span className='text-zinc-400'>{blog?.content.slice(0,50) || "Loading Content..."}...</span>
            </div>
            <div>
                {blog.link && <a className='flex gap-2 items-center' target={'_blank'} href={`${blog.link}`}><GoArrowUpRight size={24} /></a>}
            </div>
        </div>
    )
}

export default BlogCard