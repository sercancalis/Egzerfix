import { cn } from '@/lib/utils'
import React from 'react'
import moment from "moment"
import "moment/locale/tr";
import { Calendar } from 'lucide-react';
import Image from 'next/image';
const categoryList = [
    {
        name: "Branding",
        totalCount: 4
    },
    {
        name: "Corporat",
        totalCount: 3
    },
    {
        name: "Design",
        totalCount: 11
    },
    {
        name: "Galery",
        totalCount: 2
    }
]

const blogs = [
    {
        image: "https://htmldemo.zcubethemes.com/decare/img/blog/inner_b1.jpg",
        name: "Lorem ipsum dolor sit amet, consectetur cing elit, sed do eiusmod tempor.",
        summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        date: "2020-08-19"
    },
    {
        image: "https://htmldemo.zcubethemes.com/decare/img/blog/inner_b1.jpg",
        name: "There are many variations passages of like consectetur lorem ipsum available.",
        summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        date: "2020-08-19"
    },
    {
        image: "https://htmldemo.zcubethemes.com/decare/img/blog/inner_b1.jpg",
        name: "There are many variations passages of like consectetur lorem ipsum available.",
        summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.,Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse.",
        date: "2020-08-19"
    }
]

const BlogsPage = () => {
    return (
        <section className='py-12'>
            <div className='container mx-auto'>
                <div className='flex gap-x-4 w-full h-full'>
                    <div className='flex flex-col gap-y-8'>
                        <div className='flex flex-col border rounded-lg min-w-[450px] p-4'>
                            <p className='text-blue-700 font-extrabold text-xl mb-3'>Kategoriler</p>
                            {categoryList.map((category, index) => (
                                <div key={index} className={cn('flex items-center justify-between p-2', index !== categoryList.length - 1 && "border-b")}>
                                    <span>{category.name}</span>
                                    <span>({category.totalCount})</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col border rounded-lg max-w-[450px] p-4'>
                            <p className='text-blue-700 font-extrabold text-xl mb-3'>Son Yazılar</p>
                            {blogs.map((blog, index) => (
                                <div key={index} className={cn('flex flex-col p-2', index !== blogs.length - 1 && "border-b")}>
                                    <div className='flex gap-x-1'>
                                        <Calendar />
                                        <span className='text-rose-700 font-bold'>{moment(blog.date).locale("tr").format("MMMM D, YYYY")}</span>
                                    </div>
                                    <span className='font-bold'>{blog.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-8 w-full'>
                        {blogs.map((blog, index) => (
                            <div key={index} className='w-full'>
                                <Image src={blog.image} alt='Image' className='w-full  bg-contain' width={500} height={300} />
                                <div className='flex flex-col border gap-y-2 p-4'>
                                    <div className='flex gap-x-1'>
                                        <Calendar />
                                        <span className='text-gray-500 font-bold'>{moment(blog.date).locale("tr").format("MMMM D, YYYY")}</span>
                                    </div>
                                    <span className='font-extrabold text-3xl'>{blog.name}</span>
                                    <span className='font-bold text-gray-500'>{blog.summary}</span>

                                    <p className='bg-gradient-to-br from-[#0997E6] to-[#3561D9] w-40 text-center p-4 text-white uppercase rounded-lg font-extrabold'>Daha Fazla</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BlogsPage